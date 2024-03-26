// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Master {
    // Mapping from an owner address to an array of project addresses
    mapping(address => address[]) public ownerToProjects;

    // Function to add a project address for a given owner address
    function addProject(address _owner, address _project) public {
        // Push the project address into the mapping for the given owner address
        ownerToProjects[_owner].push(_project);
    }

    // Function to get all project addresses associated with a given owner address
    function getProjectsByOwner(address _owner) public view returns (address[] memory) {
        return ownerToProjects[_owner];
    }
}
