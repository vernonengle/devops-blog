package devopsdemo.blog.repository;

import devopsdemo.blog.domain.Blogger;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Blogger entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BloggerRepository extends JpaRepository<Blogger, Long> {

}
