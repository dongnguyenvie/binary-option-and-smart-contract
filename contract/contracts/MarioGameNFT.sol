// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MarioGame is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    struct Sprite {
        uint256 level;
        uint256 pump;
    }

    Counters.Counter private _tokenIdCounter;
    string _endpoint = "";
    mapping(uint256 => Sprite) private sprites;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        // _safeMint(msg.sender, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }

    function safeMint(address to, string memory _tokenURI) public onlyOwner {
        _safeMint(to, _tokenIdCounter.current());
        Sprite memory newSprite = Sprite(_random(400), _random(800));
        sprites[_tokenIdCounter.current()] = newSprite;
        _setTokenURI(_tokenIdCounter.current(), _tokenURI);
        _tokenIdCounter.increment();
    }

    function freeMint(address to, string memory _tokenURI) public {
        Sprite memory newSprite = Sprite(_random(20), _random(600));
        sprites[_tokenIdCounter.current()] = newSprite;
        _safeMint(to, _tokenIdCounter.current());
        _setTokenURI(_tokenIdCounter.current(), _tokenURI);
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
