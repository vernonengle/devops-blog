package devopsdemo.blog.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Blog.
 */
@Entity
@Table(name = "blog")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Blog implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "date_posted")
    private Instant datePosted;

    @OneToMany(mappedBy = "blog")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("blogs")
    private Blogger blogger;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public Blog content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getDatePosted() {
        return datePosted;
    }

    public Blog datePosted(Instant datePosted) {
        this.datePosted = datePosted;
        return this;
    }

    public void setDatePosted(Instant datePosted) {
        this.datePosted = datePosted;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Blog comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Blog addComment(Comment comment) {
        this.comments.add(comment);
        comment.setBlog(this);
        return this;
    }

    public Blog removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setBlog(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Blogger getBlogger() {
        return blogger;
    }

    public Blog blogger(Blogger blogger) {
        this.blogger = blogger;
        return this;
    }

    public void setBlogger(Blogger blogger) {
        this.blogger = blogger;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Blog blog = (Blog) o;
        if (blog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Blog{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", datePosted='" + getDatePosted() + "'" +
            "}";
    }
}
