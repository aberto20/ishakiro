package models;

import com.avaje.ebean.Expr;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

@Entity
public class DocOnSearch extends Model {
    @Id
    public static long id;
    public String regDate="";
    public String contact="";
    public String docType="";
    public String docNumb="";
    public String docHolder="";
    public String dob="";
    public String gender="";
    public String placeOfIssue="";
    public String placeOfFind="";
    public String status="Pending";

    public static Finder<Integer, DocOnSearch> find = new Finder<Integer, DocOnSearch>(Integer.class, DocOnSearch.class);

    public static boolean docExist(String docType,String docNumb){
        List<DocOnSearch> documentList=DocOnSearch.find.where().and(Expr.like("doc_type",docType),Expr.like("doc_numb",docNumb)).findList();
        if (documentList.size()>0){
            return true;
        }else {
            return false;
        }
    }
}
