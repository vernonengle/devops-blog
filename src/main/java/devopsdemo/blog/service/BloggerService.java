package devopsdemo.blog.service;

import devopsdemo.blog.domain.Blogger;
import devopsdemo.blog.repository.BloggerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Blogger.
 */
@Service
@Transactional
public class BloggerService {

    private final Logger log = LoggerFactory.getLogger(BloggerService.class);

    private final BloggerRepository bloggerRepository;

    public BloggerService(BloggerRepository bloggerRepository) {
        this.bloggerRepository = bloggerRepository;
    }

    /**
     * Save a blogger.
     *
     * @param blogger the entity to save
     * @return the persisted entity
     */
    public Blogger save(Blogger blogger) {
        log.debug("Request to save Blogger : {}", blogger);
        return bloggerRepository.save(blogger);
    }

    /**
     * Get all the bloggers.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Blogger> findAll() {
        log.debug("Request to get all Bloggers");
        return bloggerRepository.findAll();
    }


    /**
     * Get one blogger by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Blogger> findOne(Long id) {
        log.debug("Request to get Blogger : {}", id);
        return bloggerRepository.findById(id);
    }

    /**
     * Delete the blogger by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Blogger : {}", id);        bloggerRepository.deleteById(id);
    }
}
