function traverseTCPStates(eventList) {
    // Initialize the state variable to the starting state "CLOSED"
    let state = "CLOSED";
  
    // Define the transitions object that maps each state to a set of possible events and their corresponding next states
    let transitions = {
      'CLOSED': {
        'APP_PASSIVE_OPEN': 'LISTEN',
        'APP_ACTIVE_OPEN': 'SYN_SENT'
      },
      'LISTEN': {
        'RCV_SYN': 'SYN_RCVD',
        'APP_SEND': 'SYN_SENT',
        'APP_CLOSE': 'CLOSED'
      },
      'SYN_RCVD': {
        'APP_CLOSE': 'FIN_WAIT_1',
        'RCV_ACK': 'ESTABLISHED'
      },
      'SYN_SENT': {
        'RCV_SYN': 'SYN_RCVD',
        'RCV_SYN_ACK': 'ESTABLISHED',
        'APP_CLOSE': 'CLOSED'
      },
      'ESTABLISHED': {
        'APP_CLOSE': 'FIN_WAIT_1',
        'RCV_FIN': 'CLOSE_WAIT'
      },
      'FIN_WAIT_1': {
        'RCV_FIN': 'CLOSING',
        'RCV_FIN_ACK': 'TIME_WAIT',
        'RCV_ACK': 'FIN_WAIT_2'
      },
      'CLOSING': {
        'RCV_ACK': 'TIME_WAIT'
      },
      'FIN_WAIT_2': {
        'RCV_FIN': 'TIME_WAIT'
      },
      'TIME_WAIT': {
        'APP_TIMEOUT': 'CLOSED'
      },
      'CLOSE_WAIT': {
        'APP_CLOSE': 'LAST_ACK'
      },
      'LAST_ACK': {
        'RCV_ACK': 'CLOSED'
      }
    };
  
    // Iterate over each event in the input eventList
    for (const event of eventList) {
      // Check if the current state has a transition defined for the current event
      if (transitions[state] && transitions[state][event]) {
        // If a transition exists, update the state to the next state
        state = transitions[state][event];
      } else {
        // If no transition exists, return "ERROR"
        return "ERROR";
      }
    }
  
    // After iterating over all events, return the final state
    return state;
  }