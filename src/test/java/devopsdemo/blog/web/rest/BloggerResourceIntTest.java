package devopsdemo.blog.web.rest;

import devopsdemo.blog.BlogApp;

import devopsdemo.blog.domain.Blogger;
import devopsdemo.blog.repository.BloggerRepository;
import devopsdemo.blog.service.BloggerService;
import devopsdemo.blog.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static devopsdemo.blog.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BloggerResource REST controller.
 *
 * @see BloggerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApp.class)
public class BloggerResourceIntTest {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private BloggerRepository bloggerRepository;

    @Autowired
    private BloggerService bloggerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBloggerMockMvc;

    private Blogger blogger;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BloggerResource bloggerResource = new BloggerResource(bloggerService);
        this.restBloggerMockMvc = MockMvcBuilders.standaloneSetup(bloggerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Blogger createEntity(EntityManager em) {
        Blogger blogger = new Blogger()
            .username(DEFAULT_USERNAME)
            .email(DEFAULT_EMAIL);
        return blogger;
    }

    @Before
    public void initTest() {
        blogger = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlogger() throws Exception {
        int databaseSizeBeforeCreate = bloggerRepository.findAll().size();

        // Create the Blogger
        restBloggerMockMvc.perform(post("/api/bloggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blogger)))
            .andExpect(status().isCreated());

        // Validate the Blogger in the database
        List<Blogger> bloggerList = bloggerRepository.findAll();
        assertThat(bloggerList).hasSize(databaseSizeBeforeCreate + 1);
        Blogger testBlogger = bloggerList.get(bloggerList.size() - 1);
        assertThat(testBlogger.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testBlogger.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createBloggerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bloggerRepository.findAll().size();

        // Create the Blogger with an existing ID
        blogger.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBloggerMockMvc.perform(post("/api/bloggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blogger)))
            .andExpect(status().isBadRequest());

        // Validate the Blogger in the database
        List<Blogger> bloggerList = bloggerRepository.findAll();
        assertThat(bloggerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBloggers() throws Exception {
        // Initialize the database
        bloggerRepository.saveAndFlush(blogger);

        // Get all the bloggerList
        restBloggerMockMvc.perform(get("/api/bloggers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blogger.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getBlogger() throws Exception {
        // Initialize the database
        bloggerRepository.saveAndFlush(blogger);

        // Get the blogger
        restBloggerMockMvc.perform(get("/api/bloggers/{id}", blogger.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(blogger.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBlogger() throws Exception {
        // Get the blogger
        restBloggerMockMvc.perform(get("/api/bloggers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlogger() throws Exception {
        // Initialize the database
        bloggerService.save(blogger);

        int databaseSizeBeforeUpdate = bloggerRepository.findAll().size();

        // Update the blogger
        Blogger updatedBlogger = bloggerRepository.findById(blogger.getId()).get();
        // Disconnect from session so that the updates on updatedBlogger are not directly saved in db
        em.detach(updatedBlogger);
        updatedBlogger
            .username(UPDATED_USERNAME)
            .email(UPDATED_EMAIL);

        restBloggerMockMvc.perform(put("/api/bloggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBlogger)))
            .andExpect(status().isOk());

        // Validate the Blogger in the database
        List<Blogger> bloggerList = bloggerRepository.findAll();
        assertThat(bloggerList).hasSize(databaseSizeBeforeUpdate);
        Blogger testBlogger = bloggerList.get(bloggerList.size() - 1);
        assertThat(testBlogger.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testBlogger.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingBlogger() throws Exception {
        int databaseSizeBeforeUpdate = bloggerRepository.findAll().size();

        // Create the Blogger

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBloggerMockMvc.perform(put("/api/bloggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blogger)))
            .andExpect(status().isBadRequest());

        // Validate the Blogger in the database
        List<Blogger> bloggerList = bloggerRepository.findAll();
        assertThat(bloggerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBlogger() throws Exception {
        // Initialize the database
        bloggerService.save(blogger);

        int databaseSizeBeforeDelete = bloggerRepository.findAll().size();

        // Delete the blogger
        restBloggerMockMvc.perform(delete("/api/bloggers/{id}", blogger.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Blogger> bloggerList = bloggerRepository.findAll();
        assertThat(bloggerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Blogger.class);
        Blogger blogger1 = new Blogger();
        blogger1.setId(1L);
        Blogger blogger2 = new Blogger();
        blogger2.setId(blogger1.getId());
        assertThat(blogger1).isEqualTo(blogger2);
        blogger2.setId(2L);
        assertThat(blogger1).isNotEqualTo(blogger2);
        blogger1.setId(null);
        assertThat(blogger1).isNotEqualTo(blogger2);
    }
}
