# Bit Bistro

Welcome to Bit Bistro, the platform where freelancers and project owners meet! Bit Bistro is designed to streamline the process of finding gigs for freelancers and matching them with project owners looking for their skills.

## Features

1. **Bidding with Commitment and Reveal Scheme**

   One of our core functionalities is bidding with Commitment and Reveal Scheme. Project owners can post their projects along with the necessary details, and freelancers can bid on them. This ensures that the bidding process is secure and transparent. Once the bidding period ends, Bit Bistro will display the winning bid along with the user who made it.

   ### Commitment and Reveal Scheme
   
   In the context of the Bidding smart contract, a Commitment and Reveal Scheme can be implemented to ensure the confidentiality of bids while allowing bidders to prove their commitment to their bids.

   **Overview**

   The Commitment and Reveal Scheme involves two steps:
   
   - **Commitment Phase:** Bidders commit to their bids without revealing the actual bid amount. Instead, they submit a hashed version of their bid along with a salt.
   
   - **Reveal Phase:** After the Commitment Phase ends, bidders reveal their actual bid amounts along with the salt used during the Commitment Phase. The contract then verifies that the revealed bid amount matches the hash submitted during the Commitment Phase.

   **Implementation**

   Here's how the Commitment and Reveal Scheme can be implemented in the Bidding contract:

   - **Commitment Phase:** Bidders submit their hashed bids along with a salt using the `placeBid` function. The `placeBid` function should accept a hashed bid as an argument.
   
   - **Reveal Phase:** Bidders reveal their actual bid amounts and salts using the `revealBid` function. The `revealBid` function should accept the actual bid amount and the salt as arguments.
   
   - **Verification:** After the Commitment Phase ends, the owner of the contract triggers the Reveal Phase by calling the `computeWinner` function. During this phase, the contract verifies that the revealed bid amounts match the hashes submitted during the Commitment Phase.

2. **Escrow Contract**

   To bolster security and accountability for both project owners and freelancers, Bit Bistro introduces escrow contracts. When a project is assigned to a freelancer, both parties must sign the escrow contract and commit a predetermined amount to formalize their agreement. 

    Freelancers are required to stake 5% of the bid amount to demonstrate their commitment to completing the assigned tasks. This stake acts as assurance of their dedication. The 5% fee is refunded upon successful completion of the project; however, failure to deliver results in forfeiture of the stake. 

    Simultaneously, project owners are required to stake the winning bid amount, ensuring that the freelancer will receive payment even if issues arise from the project owner's side. 

    Subsequently, the freelancer delivers their work via Bit Bistro for review and approval by the project owner. This meticulous process guarantees mutual commitment and fulfillment of obligations before any payment is processed.

    

3. **Dispute Resolution**

   In the event of a dispute regarding the payment amount between the project owner and freelancer, Bit Bistro offers a robust dispute resolution mechanism. A panel of arbiters votes on the dispute using Zero Knowledge Proof. The number of "yes" and "no" votes determine the final payment amount to be made to the freelancer, ensuring fair and impartial resolution.

4. **ERC20 Token Contract**

   Bit Bistro has deployed an ERC20 token contract, which serves as the currency for our website. These tokens are used for staking and locking funds, as well as for transferring funds between two parties and for all other transactions where required.