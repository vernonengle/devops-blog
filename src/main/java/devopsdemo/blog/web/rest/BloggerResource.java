package devopsdemo.blog.web.rest;
import devopsdemo.blog.domain.Blogger;
import devopsdemo.blog.service.BloggerService;
import devopsdemo.blog.web.rest.errors.BadRequestAlertException;
import devopsdemo.blog.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Blogger.
 */
@RestController
@RequestMapping("/api")
public class BloggerResource {

    private final Logger log = LoggerFactory.getLogger(BloggerResource.class);

    private static final String ENTITY_NAME = "blogger";

    private final BloggerService bloggerService;

    public BloggerResource(BloggerService bloggerService) {
        this.bloggerService = bloggerService;
    }

    /**
     * POST  /bloggers : Create a new blogger.
     *
     * @param blogger the blogger to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blogger, or with status 400 (Bad Request) if the blogger has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bloggers")
    public ResponseEntity<Blogger> createBlogger(@RequestBody Blogger blogger) throws URISyntaxException {
        log.debug("REST request to save Blogger : {}", blogger);
        if (blogger.getId() != null) {
            throw new BadRequestAlertException("A new blogger cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Blogger result = bloggerService.save(blogger);
        return ResponseEntity.created(new URI("/api/bloggers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bloggers : Updates an existing blogger.
     *
     * @param blogger the blogger to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blogger,
     * or with status 400 (Bad Request) if the blogger is not valid,
     * or with status 500 (Internal Server Error) if the blogger couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bloggers")
    public ResponseEntity<Blogger> updateBlogger(@RequestBody Blogger blogger) throws URISyntaxException {
        log.debug("REST request to update Blogger : {}", blogger);
        if (blogger.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Blogger result = bloggerService.save(blogger);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blogger.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bloggers : get all the bloggers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bloggers in body
     */
    @GetMapping("/bloggers")
    public List<Blogger> getAllBloggers() {
        log.debug("REST request to get all Bloggers");
        return bloggerService.findAll();
    }

    /**
     * GET  /bloggers/:id : get the "id" blogger.
     *
     * @param id the id of the blogger to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blogger, or with status 404 (Not Found)
     */
    @GetMapping("/bloggers/{id}")
    public ResponseEntity<Blogger> getBlogger(@PathVariable Long id) {
        log.debug("REST request to get Blogger : {}", id);
        Optional<Blogger> blogger = bloggerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(blogger);
    }

    /**
     * DELETE  /bloggers/:id : delete the "id" blogger.
     *
     * @param id the id of the blogger to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bloggers/{id}")
    public ResponseEntity<Void> deleteBlogger(@PathVariable Long id) {
        log.debug("REST request to delete Blogger : {}", id);
        bloggerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
