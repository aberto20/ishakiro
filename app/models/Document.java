package models;

import com.avaje.ebean.Expr;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

/**
 * Created by Abel on 9/27/2017.
 */
@Entity
public class Document extends Model {
    @Id
    public long id;
    public String regDate="";
    public String docType="";
    public String docNumb="";
    public String docHolder="";
    public String dob="";
    public String gender="";
    public String placeOfIssue="";
    public String placeOfFind="";
    public String status="Pending";

    public static Finder<Integer, Document> find = new Finder<Integer, Document>(Integer.class, Document.class);

    public static boolean docExist(String docType,String docNumb){
        List<Document> documentList=Document.find.where().and(Expr.like("doc_type",docType),Expr.like("doc_numb",docNumb)).findList();
        if (documentList.size()>0){
            return true;
        }else {
            return false;
        }
    }


}
