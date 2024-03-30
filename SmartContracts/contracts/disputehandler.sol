// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract disputeHandler {
    struct VoteResult {
        uint votes_for;
        uint votes_against;
        bool passed;
    }

    mapping(address => bool) public arbiters;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public votedFor;
    uint public totalVotesFor;
    uint public totalVotesAgainst;

    uint public winningBidAmount;
    uint public amountToBePaid;

    address public freelancer;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyArbiter() {
        require(arbiters[msg.sender], "Only arbiters can call this function");
        _;
    }

    constructor(address[] memory _arbiters, uint _winningBidAmount) {
        owner = msg.sender;
        winningBidAmount = _winningBidAmount;
        for (uint i = 0; i < _arbiters.length; i++) {
            arbiters[_arbiters[i]] = true;
        }
    }

    function vote(bool _voteFor) external onlyArbiter {
        require(!hasVoted[msg.sender], "Arbiter has already voted");
        
        hasVoted[msg.sender] = true;
        if (_voteFor) {
            votedFor[msg.sender] = true;
            totalVotesFor++;
        } else {
            totalVotesAgainst++;
        }
    }

    function calculateVoteResult() external onlyOwner {
        
        bool passed;
        if (totalVotesFor > totalVotesAgainst) {
            passed = true;
        }
        amountToBePaid = calculateAmountToBePaid(totalVotesFor, totalVotesAgainst, winningBidAmount);
    }

    function calculateAmountToBePaid(uint yesVotes, uint noVotes, uint _winningBidAmount) internal pure returns (uint) {
    if (yesVotes == 0) {
        return 0;
    }

    uint totalVotes = yesVotes + noVotes;
    if (noVotes == 0 || yesVotes / 2 >= noVotes) {
        return _winningBidAmount;
    } else if (yesVotes > noVotes) {
        return (yesVotes * 100 * _winningBidAmount) / (totalVotes * 100);
    } else if (yesVotes == noVotes) {
        return (35 * _winningBidAmount) / 100;
    } else if (noVotes > yesVotes && (noVotes / 2) < yesVotes) {
        return (10 * _winningBidAmount) / 100;
    } else {
        return (5 * _winningBidAmount) / 100;
    }
}

}
