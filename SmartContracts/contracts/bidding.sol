// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bidding {
    // Modifier to ensure only owner can call a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Modifier to ensure bidding is active
    modifier biddingActive() {
        require(biddingPaused == false, "Bidding is currently paused");
        _;
    }

    // Struct for storing Bidding result
    struct BiddingResult {
        address winner;
        int winningBid;
    }

    // Contract state
    address owner;
    BiddingResult result;
    string public projectName;
    string public projectDescription;
    string public projectMetrics;
    mapping(address => bytes) public encryptedBids;
    mapping(address => int) public bids;
    address[] bidders;
    bool biddingPaused;

    // Events
    event BidPlaced(address bidder, uint bidAmount);
    event WinnerComputed(address winner, int winningBid);
    event BidRevealed(address bidder, int bidAmount);
    event BiddingPaused();
    event BiddingResumed();

    // Constants
    uint constant MIN_NUM_BIDDERS = 3;

    // Constructor
    constructor(
        string memory _projectName,
        string memory _projectDescription,
        string memory _projectMetrics
    ) {
        require(
            bytes(_projectName).length >= 5,
            "Project name cannot be empty"
        );
        require(
            bytes(_projectDescription).length >= 30,
            "Project description cannot be empty"
        );
        require(
            bytes(_projectMetrics).length >= 50,
            "Project metrics cannot be empty"
        );
        owner = msg.sender;
        projectName = _projectName;
        projectDescription = _projectDescription;
        projectMetrics = _projectMetrics;
        biddingPaused = false;
    }

    // Function to place bid
    function placeBid(bytes memory encryptedBid) public payable biddingActive {
        require(msg.value == 2 ether, "Stake amount must be exactly 2 ether");

        encryptedBids[msg.sender] = encryptedBid;

        emit BidPlaced(msg.sender, msg.value); 
    }

    // Function to compute winner
    function computeWinner() public onlyOwner {
        require(
            bidders.length >= MIN_NUM_BIDDERS,
            "At least 3 bidders required"
        );

        
        emit WinnerComputed(result.winner, result.winningBid);
    }

    // Function to reveal bid
    function revealBid(int bidAmount, bytes32 salt) public biddingActive {
        require(
            encryptedBids[msg.sender].length != 0,
            "You haven't placed a bid"
        );

        
        bytes memory encryptedBid = encryptedBids[msg.sender];
        bytes memory decryptedBid = new bytes(encryptedBid.length);
        for (uint i = 0; i < encryptedBid.length; i++) {
            decryptedBid[i] = encryptedBid[i] ^ salt[i];
        }

        // Convert decrypted bid to integer
        int decryptedBidAmount = parseInt(toString(decryptedBid));

        // Verify if the decrypted bid matches the provided bid amount
        require(decryptedBidAmount == bidAmount, "Invalid bid or salt");

        // Update the actual bid amount for the user (previously stored as 0)
        bids[msg.sender] = bidAmount;

        emit BidRevealed(msg.sender, bidAmount);
    }

    // Function to pause bidding
    function pauseBidding() public onlyOwner {
        require(biddingPaused == false, "Bidding is already paused");
        biddingPaused = true;
        emit BiddingPaused();
    }

    // Function to resume bidding
    function resumeBidding() public onlyOwner {
        require(biddingPaused == true, "Bidding is not paused");
        biddingPaused = false;
        emit BiddingResumed();
    }

    // Helper function to convert bytes to string
    function toString(bytes memory data) public pure returns (string memory) {
        bytes memory bytesString = new bytes(data.length);
        for (uint i = 0; i < data.length; i++) {
            bytesString[i] = data[i];
        }
        return string(bytesString);
    }

    // Helper function to convert string to integer
    function parseInt(string memory _a) internal pure returns (int) {
        bytes memory bresult = bytes(_a);
        int mint = 0;
        bool isneg = false;
        for (uint i = 0; i < bresult.length; i++) {
            if ((i == 0) && (bresult[i] == "-")) {
                isneg = true;
            }
            if ((uint8(bresult[i]) >= 48) && (uint8(bresult[i]) <= 57)) {
                mint *= 10;
                mint += int8(uint8(bresult[i])) - 48;
            }
        }
        if (isneg) {
            mint *= -1;
        }
        return mint;
    }
}
