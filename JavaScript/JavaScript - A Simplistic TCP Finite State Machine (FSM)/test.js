const Test = require('@codewars/test-compat');

describe( "traverseTCPStates", function(){
  it( "should work for the examples" , function(){
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN",  "RCV_SYN","RCV_ACK",   "APP_CLOSE"]),"FIN_WAIT_1")   // 0
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN",  "RCV_SYN","RCV_ACK"]), "ESTABLISHED")                // 1
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN",  "RCV_SYN"]), "SYN_RCVD")                             // 2
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN"]), "LISTEN")                                           // 3
    Test.assertEquals(traverseTCPStates(["APP_ACTIVE_OPEN","APP_CLOSE"]), "CLOSED")                                      //4
    Test.assertEquals(traverseTCPStates(["APP_ACTIVE_OPEN","RCV_SYN","APP_CLOSE","RCV_FIN","RCV_ACK"]), "TIME_WAIT")                // 5
    Test.assertEquals(traverseTCPStates(["APP_ACTIVE_OPEN","RCV_SYN","APP_CLOSE","RCV_FIN","RCV_ACK","APP_TIMEOUT"]), "CLOSED")  // 6
    Test.assertEquals(traverseTCPStates(["RCV_SYN","RCV_ACK","APP_CLOSE"]),"ERROR")    
    Test.assertEquals(traverseTCPStates(["APP_ACTIVE_OPEN","RCV_SYN","APP_CLOSE","RCV_ACK"]), "FIN_WAIT_2")                          // 7
    Test.assertEquals(traverseTCPStates(["APP_ACTIVE_OPEN","RCV_SYN_ACK","RCV_FIN"]), "CLOSE_WAIT")                                  // 8
    Test.assertEquals(traverseTCPStates(["APP_ACTIVE_OPEN","RCV_SYN_ACK","RCV_FIN","APP_CLOSE"]), "LAST_ACK")                      // 9
    Test.assertEquals(traverseTCPStates(["APP_ACTIVE_OPEN"]), "SYN_SENT")                                                          // 10
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN","APP_CLOSE"]), "CLOSED")                                                     // 11
    Test.assertEquals(traverseTCPStates(["APP_ACTIVE_OPEN","RCV_SYN_ACK","APP_CLOSE"]), "FIN_WAIT_1")                                      // 12
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN","RCV_SYN","RCV_ACK","APP_PASSIVE_OPEN"]), "ERROR")                        // 13 + 14
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN","RCV_SYN","RCV_ACK","APP_CLOSE","RCV_FIN_ACK","APP_TIMEOUT","APP_ACTIVE_OPEN","RCV_SYN","APP_CLOSE","RCV_FIN","RCV_ACK"]), "TIME_WAIT")
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN","RCV_SYN","RCV_ACK","APP_CLOSE","RCV_SYN"]), "ERROR")                    // 15
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN","APP_CLOSE","RCV_SYN"]), "ERROR")                                        // 16
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN","RCV_SYN","RCV_ACK","APP_CLOSE"]), "FIN_WAIT_1")                              // 17
    Test.assertEquals(traverseTCPStates(["APP_PASSIVE_OPEN","RCV_SYN","RCV_ACK","APP_CLOSE","RCV_FIN"]), "CLOSING")                       // 18    
  });
});