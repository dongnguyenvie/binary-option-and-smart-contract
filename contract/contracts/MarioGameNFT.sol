// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarioGame is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    struct Sprite {
        uint256 level;
        uint256 pump;
    }

    address private _payment;
    ERC20 private _hhd;
    uint private _fee = 0.1 * 1e18;

    Counters.Counter private _tokenIdCounter;
    string _endpoint = "";
    mapping(uint256 => Sprite) private sprites;

    constructor(string memory name, string memory symbol, address hhdAddr, address paymentAddr) ERC721(name, symbol) {
        // _safeMint(msg.sender, _tokenIdCounter.current());
        // _tokenIdCounter.increment();
        _hhd = ERC20(hhdAddr);
        _payment = paymentAddr;
    }

    function safeMint(address to, string memory _tokenURI) public onlyOwner {
        uint256 tokenID = _tokenIdCounter.current();

        _safeMint(to, tokenID);
        Sprite memory newSprite = Sprite(_random(400), _random(800));
        sprites[tokenID] = newSprite;
        _setTokenURI(tokenID, _tokenURI);
        _tokenIdCounter.increment();
    }

    function freeMint(address to, string memory _tokenURI) public {
        uint256 tokenID = _tokenIdCounter.current();

        Sprite memory newSprite = Sprite(_random(10), 100 + _random(300));
        sprites[tokenID] = newSprite;
        _safeMint(to, tokenID);
        _setTokenURI(tokenID, _tokenURI);
        _tokenIdCounter.increment();
    }

    function premiumMint(address to, string memory _tokenURI) public {
        uint256 tokenID = _tokenIdCounter.current();

        uint256 allowance = _hhd.allowance(msg.sender, address(this));
        require(allowance >= _fee, "You must pay first");
        _hhd.transferFrom(msg.sender, _payment, _fee);

        Sprite memory newSprite = Sprite(10 + _random(20), 400 + _random(400));
        sprites[tokenID] = newSprite;
        _safeMint(to, tokenID);
        _setTokenURI(tokenID, _tokenURI);
        _tokenIdCounter.increment();
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _endpoint;
    }

    function setEndpoint(string memory endpoint) public onlyOwner {
        _endpoint = endpoint;
    }

    function currentCounter() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function attrsOf(uint256 tokenId) public view returns (Sprite memory) {
        return sprites[tokenId];
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _random(uint256 max) private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, block.difficulty))
            ) % max;
    }
}
