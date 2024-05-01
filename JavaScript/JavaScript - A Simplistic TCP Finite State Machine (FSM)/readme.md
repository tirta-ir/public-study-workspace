# A Simplistic TCP Finite State Machine (FSM)

## Description
Automatons, or Finite State Machines (FSM), are extremely useful to programmers when it comes to software design. You will be given a simplistic version of an FSM to code for a basic TCP session.

The outcome of this exercise will be to return the correct state of the TCP FSM based on the array of events given.

## Events

The input array of events will consist of one or more of the following strings:

- APP_PASSIVE_OPEN
- APP_ACTIVE_OPEN
- APP_SEND
- APP_CLOSE
- APP_TIMEOUT
- RCV_SYN
- RCV_ACK
- RCV_SYN_ACK
- RCV_FIN
- RCV_FIN_ACK

## States

The states are as follows and should be returned in all capital letters as shown:

- CLOSED
- LISTEN
- SYN_SENT
- SYN_RCVD
- ESTABLISHED
- CLOSE_WAIT
- LAST_ACK
- FIN_WAIT_1
- FIN_WAIT_2
- CLOSING
- TIME_WAIT

The initial state is **CLOSED**. My job is to traverse the FSM as determined by the events, and return the proper final state as a string, all caps, as shown above.

If an event is not applicable to the current state, your code will return **ERROR**.

## Actions

Action of each event upon each state (the format is ``INITIAL_STATE: EVENT -> NEW_STATE``):

```
- CLOSED: APP_PASSIVE_OPEN -> LISTEN
- CLOSED: APP_ACTIVE_OPEN  -> SYN_SENT
- LISTEN: RCV_SYN          -> SYN_RCVD
- LISTEN: APP_SEND         -> SYN_SENT
- LISTEN: APP_CLOSE        -> CLOSED
- SYN_RCVD: APP_CLOSE      -> FIN_WAIT_1
- SYN_RCVD: RCV_ACK        -> ESTABLISHED
- SYN_SENT: RCV_SYN        -> SYN_RCVD
- SYN_SENT: RCV_SYN_ACK    -> ESTABLISHED
- SYN_SENT: APP_CLOSE      -> CLOSED
- ESTABLISHED: APP_CLOSE   -> FIN_WAIT_1
- ESTABLISHED: RCV_FIN     -> CLOSE_WAIT
- FIN_WAIT_1: RCV_FIN      -> CLOSING
- FIN_WAIT_1: RCV_FIN_ACK  -> TIME_WAIT
- FIN_WAIT_1: RCV_ACK      -> FIN_WAIT_2
- CLOSING: RCV_ACK         -> TIME_WAIT
- FIN_WAIT_2: RCV_FIN      -> TIME_WAIT
- TIME_WAIT: APP_TIMEOUT   -> CLOSED
- CLOSE_WAIT: APP_CLOSE    -> LAST_ACK
- LAST_ACK: RCV_ACK        -> CLOSED
```

## Examples
```
["APP_PASSIVE_OPEN", "APP_SEND", "RCV_SYN_ACK"] =>  "ESTABLISHED"

["APP_ACTIVE_OPEN"] =>  "SYN_SENT"

["APP_ACTIVE_OPEN", "RCV_SYN_ACK", "APP_CLOSE", "RCV_FIN_ACK", "RCV_ACK"] =>  "ERROR"
```

## Solution Breakdown
- The function takes an array of event strings as input and initializes the state variable to the starting state **CLOSED**.
- It defines a transitions object that maps each state to a set of possible events and their corresponding next states
- It iterates over each event in the input *eventList*.
- For each event, it checks if the current state has a transition defined for the current event.
- If a transition exists, it updates the state to the next state.
- If no transition exists, it returns "ERROR".
After iterating over all events, it returns the final state.

## Disclaimer
This sub-repo provides a solution and explaination for a **4th Kyu Kata in Code Wars**. The content provided in this document is solely for the purpose of training my coding skills.

Any explaination and description is shared for educational purposes and isn't intended for cheating on Code Wars attempt. Feel free to learn from it.
