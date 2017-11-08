package models;


import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.Charset;
import java.util.List;

/**
 * Created by Abel on 9/27/2017.
 */
@Entity
public class User extends Model {
    @Id
    public long id;
    public String names="";
    public String email="";
    public String phone="";
    public String password="";
    public String role="";
    public String joinDate="";

    public static Finder<Integer, User> find = new Finder<Integer, User>(Integer.class, User.class);

    public static User findByEmail(String email){
        User userList=User.find.where().eq("email",email).findUnique();
        return userList;
    }
    public static User findByPhone(String phone){
        User userList=User.find.where().eq("phone",phone).findUnique();
        return userList;
    }

    public static String passwordEncoded(String password){
      return   DatatypeConverter.printBase64Binary(password.getBytes());
    }
    public static String passwordDencoded(String passwordHash){
        return   new String(DatatypeConverter.parseBase64Binary(passwordHash));
    }


}
