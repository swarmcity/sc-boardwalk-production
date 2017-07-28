pragma solidity ^0.4.11;

contract IHashtag {

import './swarmcity/contracts/IHashtag.sol';
import './zeppelin/contracts/ownership/Ownable.sol';

contract HashtagList is Ownable {

    mapping (address => string) storedMap;

    function setBytesRaw(string x) {
        storedMap[msg.sender] = x;
    }

    function setBytes(address _hashtagAddress, string x) {
        IHashtag hashtag = IHashtag(_hashtagAddress);
        if (msg.sender != hashtag.getConflictResolver()) {
            throw;
        }

        storedMap[_hashtagAddress] = x;
    }

    function getMap(address _hashtagAddress) constant returns (string returnValue) {
        returnValue = storedMap[_hashtagAddress];
    }

}