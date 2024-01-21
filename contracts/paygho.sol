// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IGhoToken.sol";

contract GHOPayGame is RrpRequesterV0 {
       IGhoToken public immutable GHO;
    event TokensStaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
  mapping(bytes32 => uint256) public requestIdToGameId;

   address public constant ghoToken = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60;


    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;
    uint256 public lockTime;
    uint256 public rewardRangeStart;
    uint256 public rewardRangeEnd;


    mapping(address => uint256) public stakedAmounts;
    mapping(address => uint256) public lockedUntil;
    mapping(address => uint256) public rewards;

    struct SingleGame { 
      bytes32 requestId;
      uint256 randomNumber;
       address[] players; 
        mapping(address => uint256) playerBets;
        mapping(address => uint256) GHOAmount;
    }

uint256  public game =1;
 mapping(uint256 =>SingleGame) public eachGame;
   
    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {
         GHO = IGhoToken(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60);
    }

  function startRound(address player,uint256 amount,uint256 gameid,uint256 _ghoamount) external  {
        GHO.transferFrom(msg.sender, address(this), amount);
       SingleGame storage newGame = eachGame[gameid];
        if (newGame.players.length == 0) {
            newGame.players = new address[](0);
        }
        newGame.playerBets[player] = amount;
        newGame.players.push(player);
        newGame.GHOAmount[player]=_ghoamount;
        if (newGame.players.length == 1) {
            game++;
        }
    }

    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        address _sponsorWallet
    ) external {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        sponsorWallet = _sponsorWallet;
    }
   function makeRequestUint256() external {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256.selector,
            ""
        );
 requestIdToGameId[requestId] = game; 
    }
    function fulfillUint256(bytes32 requestId, bytes calldata data)
        external
        onlyAirnodeRrp
    {  
    uint256 qrngUint256 = abi.decode(data, (uint256));
    uint256 gameId = requestIdToGameId[requestId];
    eachGame[gameId].randomNumber=(qrngUint256 % 1500);
}


 function withdrawRewards(uint256 gameId) public {
      if( eachGame[gameId].GHOAmount[msg.sender]< eachGame[gameId].randomNumber){
         uint256 _amount=eachGame[gameId].GHOAmount[msg.sender]+eachGame[gameId].playerBets[msg.sender];
                    eachGame[gameId].playerBets[msg.sender]=1500;
                   GHO.transfer(msg.sender, _amount);

      }
 }
}