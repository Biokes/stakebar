 // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract ThriftPoolManager {
      struct ThriftGroup {
          address[] members;
          uint256 totalStaked;
          uint256 createdAt;
          bool isActive;
      }

      mapping(uint256 => ThriftGroup) public groups;
      uint256 public groupCounter;

      function createGroup() external returns (uint256) {
          groupCounter++;
          groups[groupCounter].isActive = true;
          groups[groupCounter].createdAt = block.timestamp;
          return groupCounter;
      }

      function joinGroup(uint256 groupId) external payable {
          require(msg.value >= 0.01 ether, "Minimum stake required");
          groups[groupId].members.push(msg.sender);
          groups[groupId].totalStaked += msg.value;
      }

      function getGroupDetails(uint256 groupId) external view returns (
          address[] memory,
          uint256,
          uint256,
          bool
      ) {
          ThriftGroup memory group = groups[groupId];
          return (group.members, group.totalStaked, group.createdAt, group.isActive);
      }
  }