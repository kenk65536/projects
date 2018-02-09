package serverApp;
import java.net.*;
import java.io.*;
import java.lang.*;
import java.util.*;
public class App{
  private static ServerSocket serverSocket;
  private static int port = 3000;
  private static int count = 0;
  private static ArrayList clients = new ArrayList();
  public static void waitNewClient(){
    try{
      Socket socket = serverSocket.accept();
      ++count;
      System.out.println("Client number: " + count);
      createNewClient(socket);
    }catch(IOException e){
       System.out.println("Waint client error,");
       e.printStackTrace();
     }
  }
  public static void createNewClient(final Socket socket) throws IOException{
    Thread thread = new Thread(new Runnable(){
      @Override
      public void run(){
        try{
          clients.add(socket);
          BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
          while(socket.isConnected()){
            String msg = br.readLine();
            if(msg == null){
              System.out.println("Client disconnected !");
              break;
            }
            System.out.println(msg);
            castMessage(msg);
            msg = "";
          }
        }catch(Exception e){
           System.out.println("Create new client error");
           e.printStackTrace();
         }
         finally{
           clients.remove(socket);
           --count;
           System.out.println("Client number: " + count);
         }
      }
    });
    thread.start();
  }
  public static void castMessage(String msg){
    Socket[] sockets = new Socket[clients.size()];
    clients.toArray(sockets);
    for(Socket socket : sockets)
      try{
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        bw.write(msg + "\n");
        bw.flush();
      }catch(IOException e){
         System.out.println("Cast Message error,");
         e.printStackTrace();
       }
  }
  public static void main(String[] args){
    try{
      serverSocket = new ServerSocket(port);
      System.out.println("Server is start for : " + port);
      while(!serverSocket.isClosed())
        waitNewClient();
    }catch(IOException e){
       System.out.println("Server socket error");
       e.printStackTrace();
     }
  }
}
