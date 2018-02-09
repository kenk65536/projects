package chatRoom;
import java.util.*;
import java.text.*;
import java.net.*;
import java.io.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
public class App extends JFrame{
  private Container contentPane;
  private JPanel chatPanel;
  private JTextArea jtaOutputMessage;
  private JScrollPane scrollPane;
  private Box boxSendMessage;
  private JTextField jtfInputMessage;
  private JButton buttonSend;
//  private DataOutputStream dos;
//  private DataInputStream dis;
  private BufferedWriter bw;
  private BufferedReader br;
  private Socket socket;
  private Thread threadRead;
  public App(){
    initComponent();
    initListener();
    connect();
  }
  private void initComponent(){
    initFrame();
    initChatPanel();
    initJtaOutputMessage();
    initScrollPane();
    initBoxSendMessage();
    initJtfInputMessage();
    initButtonSend();
  }
  private void initFrame(){
    contentPane = this.getContentPane();
    setTitle("ChatRoom");
    setSize(400, 400);
    getRootPane().setWindowDecorationStyle(JRootPane.NONE);
//    setUndecorated(true);
    setResizable(false);
    setLocationRelativeTo(null);
  }
  private void initChatPanel(){
    chatPanel = new JPanel(new BorderLayout());
    contentPane.add(chatPanel);
  }
  private void initJtaOutputMessage(){
    jtaOutputMessage = new JTextArea();
    jtaOutputMessage.setEditable(false);
  }
  private void initScrollPane(){
    scrollPane = new JScrollPane(jtaOutputMessage);
    chatPanel.add(scrollPane, BorderLayout.CENTER);
  }
  private void initBoxSendMessage(){
    boxSendMessage = Box.createHorizontalBox();
    chatPanel.add(boxSendMessage, BorderLayout.SOUTH);
  }
  private void initJtfInputMessage(){
    jtfInputMessage = new JTextField();
    boxSendMessage.add(jtfInputMessage);
  }
  private void initButtonSend(){
    buttonSend = new JButton("Send");
    boxSendMessage.add(buttonSend);
  }
  private void initListener(){
    sendMessage();
    exit();
  }
  private void exit(){
    this.addWindowListener(new WindowAdapter(){
      @Override
      public void windowClosing(WindowEvent e){
        disconnect();
        System.exit(0);
      }
    });
  }
  private void connect(){
    try{
      socket = new Socket("192.168.1.6", 3000);
//      dos = new DataOutputStream(socket.getOutputStream());
//      dis = new DataInputStream(socket.getInputStream());
      bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
      br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    }catch(UnknownHostException e){
       System.out.println("Unknow host");
       e.printStackTrace();
     }
     catch(IOException e){
       System.out.println("IO error");
       e.printStackTrace();
     }
    threadRead = new Thread(readData);
    threadRead.start();
  }
  private void disconnect(){
    try{
      //dos.flush();
      //dos.close();
      bw.flush();
      bw.close();
      bw = null;
      socket.close();
      socket = null;
    }catch(IOException e){
       e.printStackTrace();
     }
  }
  private void sendMessage(){
    jtfInputMessage.addActionListener(new ActionListener(){
      @Override
      public void actionPerformed(ActionEvent e){
        String strMsg = jtfInputMessage.getText();
        jtfInputMessage.setText("");
        try{
          //dos.writeUTF(strMsg + "\n");
          //dos.flush();
          bw.write(strMsg + "\n");
          bw.flush();
        }catch(IOException ex){
           System.out.println("Send error");
           ex.printStackTrace();
         }
      }
    });
  }
  private Runnable readData = new Runnable(){
    @Override
    public void run(){
      String tmp;
      SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      String time;
      while(socket.isConnected()){
        try{
          tmp = br.readLine();
          if(tmp == null || tmp == "\n")
            JOptionPane.showMessageDialog(null, "Please send message");
          else{
            Date date = new Date();
            time = dateFormat.format(date);
            jtaOutputMessage.append(tmp + " " + time + "\n");
          }
        }catch(IOException e){
           jtaOutputMessage.append("Output error\n");
           e.printStackTrace();
         }
      }
    }
  };
  public static void main(String[] args){
    SwingUtilities.invokeLater(new Runnable(){
      @Override
      public void run(){
        new App().setVisible(true);
      }
    });
  }
}
