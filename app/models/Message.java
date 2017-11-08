package models;

import play.db.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Abel on 10/12/2017.
 */
@Entity
public class Message extends Model {
    @Id
    public long id;
    public String date="";
    public String names="";
    public String subject="";
    public String phone="";
    @Column(columnDefinition = "TEXT")
    public String message="";

    public static Finder<Integer, Message> find = new Finder<Integer, Message>(Integer.class, Message.class);

}
