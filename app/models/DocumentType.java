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
public class DocumentType extends Model {
    @Id
    public long id;
    public String docName="";


    public static Finder<Integer, DocumentType> find = new Finder<Integer, DocumentType>(Integer.class, DocumentType.class);

    public static boolean docExist(String docName){
        List<DocumentType> documentList=DocumentType.find.where().like("doc_name",docName).findList();
        if (documentList.size()>0){
            return true;
        }else {
            return false;
        }
    }
}
