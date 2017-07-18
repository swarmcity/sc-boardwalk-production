pragma solidity ^0.4.6;

import './MiniMeToken.sol';

/// @dev `Owned` is a base level contract that assigns an `owner` that can be
///  later changed
contract Owned {
    /// @dev `owner` is the only address that can call a function with this
    /// modifier
    modifier onlyOwner { if (msg.sender != owner) throw; _; }

    address public owner;

    /// @notice The Constructor assigns the message sender to be `owner`
    function Owned() { owner = msg.sender;}

    /// @notice `owner` can step down and assign some other address to this role
    /// @param _newOwner The address of the new owner. 0x0 can be used to create
    ///  an unowned neutral vault, however that cannot be undone
    function changeOwner(address _newOwner) onlyOwner {
        owner = _newOwner;
    }
}

contract SampleController is TokenController, Owned {

    MiniMeToken public tokenContract;   // The new token

    function SampleController(
    address _tokenAddress          // the MiniMe token address
    ) {

        tokenContract = MiniMeToken(_tokenAddress); // The Deployed Token Contract
    }

    function mintTokens(
    address _recepient,
    uint _amount
    ){
        tokenContract.generateTokens(_recepient, _amount);  // mint some tokens for the creator
    }

    /////////////////
    // TokenController interface
    /////////////////


    function proxyPayment(address _owner) payable returns(bool) {
        throw;
    }

    /// @notice Notifies the controller about a transfer, for this SWTConverter all
    ///  transfers are allowed by default and no extra notifications are needed
    /// @param _from The origin of the transfer
    /// @param _to The destination of the transfer
    /// @param _amount The amount of the transfer
    /// @return False if the controller does not authorize the transfer
    function onTransfer(address _from, address _to, uint _amount) returns(bool) {
        return true;
    }

    /// @notice Notifies the controller about an approval, for this SWTConverter all
    ///  approvals are allowed by default and no extra notifications are needed
    /// @param _owner The address that calls `approve()`
    /// @param _spender The spender in the `approve()` call
    /// @param _amount The amount in the `approve()` call
    /// @return False if the controller does not authorize the approval
    function onApprove(address _owner, address _spender, uint _amount)
    returns(bool)
    {
        return true;
    }

}