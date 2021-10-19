// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ShopNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string _endpoint = "";

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        // _safeMint(msg.sender, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }

    function safeMint(address to) public onlyOwner {
        _safeMint(to, _tokenIdCounter.current());
        // _setTokenURI(_tokenIdCounter.current(), _tokenURI);
        _tokenIdCounter.increment();
    }

    function freeMint(address to) public {
        _safeMint(to, _tokenIdCounter.current());
        // _setTokenURI(_tokenIdCounter.current(), _tokenURI);
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
}
