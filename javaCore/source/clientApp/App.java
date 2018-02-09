package clientApp;
import java.net.*;
import java.io.*;
public class App{
  private String address = "192.168.1.6";
  private int port = 3000;
  public App(){
    //Socket client = new Socket();
    //InetSocketAddress isa = new InetSocketAddress(this.address, this.port);
    try{
      //client.connect(isa, 10000);
      Socket client = new Socket(this.address, this.port);
      BufferedOutputStream out = new BufferedOutputStream(client.getOutputStream());
      out.write("Send from client".getBytes());
      out.flush();
      out.close();
      out = null;
      client.close();
      client = null;
    }catch(IOException ex){
       System.out.println("Socket connect error !");
       ex.printStackTrace();
     }
  }
  public static void main(String[] args){
    new App();
  }
}
