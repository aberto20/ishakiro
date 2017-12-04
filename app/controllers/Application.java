package controllers;


import com.avaje.ebean.Expr;
import models.*;
import play.data.Form;
import play.libs.Json;
import play.mvc.*;

import views.html.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


public class Application extends Controller {

    public static Result index() {
        return ok(index.render());
    }
    public static Result about() {
        return ok(about.render());
    }
    public static Result ourJob() {
        return ok(ourJob.render());
    }
    public static Result contact() {
        return ok(contact.render());
    }
    public static Result dashboard() {
        if (session("userId")==null){
            return ok(index.render());
        }
        return ok(dashBoard.render());
    }
    public static Result docOnSerch() {
        if (session("userId")==null){
            return ok(index.render());
        }
        return ok(docOnSearch.render());
    }
    public static Result message() {
        if (session("userId")==null){
            return ok(index.render());
        }
        return ok(message.render());
    }
    public static Result users() {
        if (session("userId")==null){
            return ok(index.render());
        }
        return ok(userAccount.render());
    }
    public static Result docTypep() {
        if (session("userId")==null){
            return ok(index.render());
        }
        return ok(docType.render());
    }
    public static Result documentsp() {
        if (session("userId")==null){
            return ok(index.render());
        }
        return ok(lossDoc.render());
    }
    public static Result logout() {
        session().clear();
        return ok(index.render());
    }

    public static Result registerUser(){
        Form<User> userForm=Form.form(User.class).bindFromRequest();
        User user=userForm.get();
        Date date=new Date();
        SimpleDateFormat dateformatddMMyyyy = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        if (User.findByEmail(user.email)!=null ){
            return ok("emailExist");
        }else if (User.findByPhone(user.phone)!=null){
            return ok("phoneExist");
        }
        user.joinDate=dateformatddMMyyyy.format(date);
        user.password=User.passwordEncoded(user.password);
        if (user.role.isEmpty()){
            user.role="LowUser";
        }
        user.save();
        return ok("ok");
    }
    public static Result editUser(){
        Form<User> userForm=Form.form(User.class).bindFromRequest();
        User user=userForm.get();
        User user2=User.find.byId((int) user.id);
        user2.names=user.names;
        user2.email=user.email;
        user2.phone=user.phone;
        user2.role=user.role;
        user2.update();
        return ok("ok");
    }
    public static Result DeleteUser(){
        Form<User> userForm=Form.form(User.class).bindFromRequest();
        User user=userForm.get();
        User user2=User.find.byId((int) user.id);
        user2.delete();
        return ok("ok");
    }
    public static Result loadCurrentUser(){
        User user=User.find.where().eq("id",session("userId")).findUnique();
        return ok(Json.toJson(user));
    }
    public static Result loadUser(){
        List<User> user=User.find.all();
        return ok(Json.toJson(user));
    }
    public static Result loadDocType(){
        List<DocumentType> user=DocumentType.find.all();
        return ok(Json.toJson(user));
    }
    public static Result loadmsg(){
        List<Message> user=Message.find.all();
        return ok(Json.toJson(user));
    }
    public static Result loadDocument(){
        List<Document> user=Document.find.where().findList();
        return ok(Json.toJson(user));
    }
    public static Result loadDocOnSearch(){
        List<DocOnSearch> user=DocOnSearch.find.where().order().desc("status").setMaxRows(5000).findList();
        return ok(Json.toJson(user));
    }
    public static Result searchDocument(String doc){
        List<Document> user=Document.find.where().like("status","Pending").or(Expr.like("doc_numb",doc),Expr.like("doc_holder","%"+doc+"%")).findList();
        return ok(Json.toJson(user));
    }

    public static Result signin(){
        Form<User>userForm=Form.form(User.class).bindFromRequest();
        User user=userForm.get();
        boolean auth=false;

        User user1=User.find.where().eq("email","admin@ishakiro.com").findUnique();
        if (user1==null){
            User user2=new User();
            user2.names="System admin";
            user2.email="admin@ishakiro.com";
            user2.role="Admin";
            user2.password=User.passwordEncoded("admin@123");
            user2.save();
            System.out.println("System admin");
        }
        List<User>userList=User.find.where().or(com.avaje.ebean.Expr.eq("email",user.email), com.avaje.ebean.Expr.like("phone",user.phone)).findList();
        for (User a:userList){
            if (a.password.equals(User.passwordEncoded(user.password))){
                auth=true;
                session("userId",String.valueOf(a.id));
            }
        }
        if (auth){
            return ok("ok");
        }else {
            return ok("error");
        }
    }
    public static Result findedDoc(String docType,String docNumb){
            Document document=Document.find.where().and(Expr.like("doc_type",docType),Expr.like("doc_numb",docNumb)).findUnique();
            document.status="Finded";
            document.update();
        return ok("ok");
    }
    public static Result registerDoc(){
        Form<Document> userForm=Form.form(Document.class).bindFromRequest();
        Document doc=userForm.get();
        Date date=new Date();
        SimpleDateFormat dateformatddMMyyyy = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        if (Document.docExist(doc.docType,doc.docNumb)){
            Document document=Document.find.where().and(Expr.like("doc_type",doc.docType),Expr.like("doc_numb",doc.docNumb)).findUnique();
            document.status="Pending";
            document.update();
            return ok("exist");
        }
        doc.regDate=dateformatddMMyyyy.format(date);
        doc.save();
        return ok("ok");
    }
    public static Result registerDoc2(){
        Form<DocOnSearch> userForm=Form.form(DocOnSearch.class).bindFromRequest();
        DocOnSearch doc=userForm.get();
        Date date=new Date();
        SimpleDateFormat dateformatddMMyyyy = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        if (DocOnSearch.docExist(doc.docType,doc.docNumb)){
            DocOnSearch document=DocOnSearch.find.where().and(Expr.like("doc_type",doc.docType),Expr.like("doc_numb",doc.docNumb)).findUnique();
            document.status="Pending";
            document.update();
            return ok("exist");
        }
        doc.regDate=dateformatddMMyyyy.format(date);
        doc.save();
        return ok("ok");
    }
    public static Result sendComment(){
        Form<Message> userForm=Form.form(Message.class).bindFromRequest();
        Message doc=userForm.get();
        Date date=new Date();
        SimpleDateFormat dateformatddMMyyyy = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        doc.date=dateformatddMMyyyy.format(date);
        doc.save();
        return ok("ok");
    }
    public static Result deleteMsg(){
        Form<Message> userForm=Form.form(Message.class).bindFromRequest();
        Message doc=userForm.get();
        Message message=Message.find.byId((int) doc.id);
        message.delete();
        return ok("ok");
    }
    public static Result editDoc(){
        Form<Document> userForm=Form.form(Document.class).bindFromRequest();
        Document doc=userForm.get();

        Document docs=Document.find.byId((int) doc.id);
        docs.dob=doc.dob;
        docs.docHolder=doc.docHolder;
        docs.docNumb=doc.docNumb;
        docs.docType=doc.docType;
        docs.placeOfFind=doc.placeOfFind;
        docs.placeOfIssue=doc.placeOfIssue;
        docs.gender=doc.gender;
        docs.update();

        return ok("ok");
    }
    public static Result deleteDoc(){
        Form<Document> userForm=Form.form(Document.class).bindFromRequest();
        Document doc=userForm.get();

        Document docs=Document.find.byId((int) doc.id);
        docs.delete();

        return ok("ok");
    }
    public static Result registerDocType(){
        Form<DocumentType> userForm=Form.form(DocumentType.class).bindFromRequest();
        DocumentType doc=userForm.get();
        Date date=new Date();
        SimpleDateFormat dateformatddMMyyyy = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        if (DocumentType.docExist(doc.docName)){
            return ok("exist");
        }
        doc.save();
        return ok("ok");
    }
    public static Result editDocType(){
        Form<DocumentType> userForm=Form.form(DocumentType.class).bindFromRequest();
        DocumentType doc=userForm.get();
        DocumentType doc2=DocumentType.find.byId((int) doc.id);
        doc2.docName=doc.docName;
        doc.update();
        return ok("ok");
    }
    public static Result deleteDocType(){
        Form<DocumentType> userForm=Form.form(DocumentType.class).bindFromRequest();
        DocumentType doc=userForm.get();
        DocumentType doc2=DocumentType.find.byId((int) doc.id);
        doc.delete();
        return ok("ok");
    }

}
