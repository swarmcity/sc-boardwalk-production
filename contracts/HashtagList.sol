pragma solidity ^0.4.11;

import './zeppelin/contracts/ownership/Ownable.sol';
import './swarmcity/contracts/IHashtag.sol';

contract HashtagList is Ownable {

    struct Deal {
        bytes32 name;
        bytes32 ipfsHash;
        bytes32 geoHash;
        uint hashtagId;
        uint totalDeals;
        address hashtagAddress;
        string description;
    }

    Deal[] deals;

    function HashtagList() {
        Deal memory deal;
        deals.push(deal);
    }

    function newHashtag(bytes32 _name, uint _hashtagId, address _hashtagAddress, bytes32 _geohash,
                        string _description, bytes32 _ipfsHash) {
        IHashtag hashtag = IHashtag(_hashtagAddress);
        if (msg.sender != hashtag.getConflictResolver()) {
            throw;
        }
        Deal aDeal = deals[0];
        aDeal.name = _name;
        aDeal.hashtagId = _hashtagId;
        aDeal.hashtagAddress = _hashtagAddress;
        aDeal.geoHash = _geohash;
        aDeal.description = _description;
        aDeal.ipfsHash = _ipfsHash;

        deals.push(aDeal);

        NewHashtag(msg.sender, _ipfsHash);
    }
    function getHashtag(){

    }

    event NewHashtag(address indexed _sender, bytes32 _ipfsHash);

}
