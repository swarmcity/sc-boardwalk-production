pragma solidity ^0.4.11;

contract DealForTwoEnumerable {
    enum DealStatuses {
        Open,
        Done,
        Disputed,
        Resolved,
        Canceled
    }
}

contract DealForTwoFactory is DealForTwoEnumerable {
    event NewDealForTwo(address dealForTwoAddress);

    struct dealStruct {
        DealStatuses status;
        uint commissionValue;
        uint dealValue;
        address provider;
    }

    mapping(bytes32=>dealStruct) deals;

    IHashtag public hashtag;
    IMiniMeToken public hashtagToken;

    function DealForTwoFactory(IHashtag _hashtag) {
        hashtag = _hashtag;
        hashtagToken = IMiniMeToken(_hashtag.getTokenAddress());
    }

    function makeDealForTwo(string _dealid, uint _offerValue) {

        // make sure there is enough to pay the commission later on
        if (hashtag.commission() / 2 > _offerValue){
            throw;
        }

        // fund this deal
        if (!hashtagToken.transferFrom(msg.sender,this,_offerValue)) {
            throw;
        }

        // if it's funded - fill in the details
        deals[sha3(msg.sender,_dealid)] = dealStruct(DealStatuses.Open,hashtag.commission(),_offerValue,0);
    }

    function cancelDeal(string _dealid){
        dealStruct d = deals[sha3(msg.sender,_dealid)];
        if (d.dealValue > 0 && d.provider == 0x0) {
            // cancel this Deal
            if (!hashtagToken.transfer(msg.sender,d.dealValue)) { throw; }
            deals[sha3(msg.sender,_dealid)].status = DealStatuses.Canceled;
        }
    }

    // seeker or provider can choose to dispute an ongoing deal
    function dispute(string _dealid, address _dealowner) {
        dealStruct d = deals[sha3(_dealowner,_dealid)];
        if (d.status != DealStatuses.Open) { throw; }

        if (msg.sender == _dealowner) {
            // seeker goes in conflict

            // can only be only when there is a provider
            if (d.provider == 0x0 ) { throw; }

        } else {
            // if not the seeker, only the provider can go in conflict
            if (d.provider != msg.sender) { throw; }
        }
        // mark the deal as Disputed
        deals[sha3(_dealowner,_dealid)].status = DealStatuses.Disputed;
    }

    // conflict resolver can resolve a disputed deal
    function resolve(string _dealid, address _dealowner, uint _seekerFraction) {
        dealStruct d = deals[sha3(_dealowner,_dealid)];

        // this function can only be called by the current conflict resolver of the hastag
        if (msg.sender != hashtag.getConflictResolver()) { throw; }

        // only disputed deals can be resolved
        if (d.status != DealStatuses.Disputed) { throw; }

        // send the seeker fraction back to the dealowner
        if (!hashtagToken.transfer(_dealowner,_seekerFraction)) { throw; }

        // send the remaining deal value back to the provider
        if (!hashtagToken.transfer(d.provider,d.dealValue - _seekerFraction)) { throw; }

        deals[sha3(_dealowner,_dealid)].status = DealStatuses.Resolved;

    }

    function fundDeal(string _dealid, address _dealowner) {

        bytes32 key = sha3(_dealowner,_dealid);

        dealStruct d = deals[key];

        // if the provider is filled in - the deal was already funded
        if (d.provider != 0x0) {
            throw;
        }

        // put the tokens from the provider on the deal
        if (!hashtagToken.transferFrom(msg.sender,this,d.dealValue)) {
            throw;
        }

        // fill in the address of the provider ( to payout the deal later on )
        deals[key].provider = msg.sender;
    }

    function readDeal(string _dealid, address _dealowner) returns(DealStatuses status, uint commissionValue, uint dealValue, address provider) {
        bytes32 key = sha3(_dealowner,_dealid);
        return (deals[key].status,deals[key].commissionValue,deals[key].dealValue,deals[key].provider);
    }

    function payout(string _dealid) {

        bytes32 key = sha3(msg.sender,_dealid);

        dealStruct d = deals[key];

        // you can only payout open deals
        if (d.status != DealStatuses.Open) { throw; }

        // pay out commission
        if (!hashtagToken.transfer(hashtag.getConflictResolver(),d.commissionValue)) { throw; }

        // pay out the provider
        if (!hashtagToken.transfer(d.provider,d.dealValue * 2 - d.commissionValue)) { throw; }

        // mint REP for both parties
        hashtag.mintRep(d.provider,5);
        hashtag.mintRep(msg.sender,5);

        // mark the deal as done
        deals[key].status = DealStatuses.Done;
    }
}

contract IMiniMeToken {
    function transfer(address _to, uint256 _amount) returns (bool success);
    function transferFrom(address _from, address _to, uint256 _amount) returns (bool success);
    function balanceOf(address _owner) constant returns (uint256 balance);
}

contract IHashtag {
    // inherited
    function owner() public constant returns(address);
    function transferOwnership(address newOwner);
    function name() public constant returns(string);
    function registeredDeals() public constant returns(uint);
    function successfulDeals() public constant returns(uint);
    function validFactories() public constant returns(bool);
    function commission() public constant returns(uint);
    function metadataHash() public constant returns(string);
    function setMetadataHash(string _metadataHash);
    function addFactory(address _factoryAddress);
    function removeFactory(address _factoryAddress);
    function getRepTokenAddress() returns(address);
    function getTokenAddress() returns(address);
    function getConflictResolver() returns(address);
    function registerDeal(address _dealContract,address _dealOwner);
    function mintRep(address _receiver,uint _amount);
}

/*
 * Ownable
 *
 * Base contract with an owner.
 * Provides onlyOwner modifier, which prevents function from running if it is called by anyone other than the owner.
 */
contract Ownable {
    address public owner;

    function Ownable() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            throw;
        }
        _;
    }

    function transferOwnership(address newOwner) onlyOwner {
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }
}