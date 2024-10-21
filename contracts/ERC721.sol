// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken721 is ERC721, Ownable {
    /// @notice Конструктор контракта, который указывает владельца.
    /// @param initialOwner Адрес владельца, которому принадлежат права собственности на контракт.
    constructor(address initialOwner) ERC721("MyToken", "MTK") Ownable(initialOwner) {}

    /// @dev Переменная для хранения URI.
    string private _uri;

    /// @notice Устанавливает новый базовый URI для всех токенов.
    /// @dev Функция может быть вызвана только владельцем контракта.
    /// @param newUri Новый URI, который будет установлен в качестве базового URI для токенов.
    function setURI(string memory newUri) external onlyOwner {
        _uri = newUri;
    } 

    /// @notice Возвращает базовый URI для всех токенов
    /// @dev Этот метод внутренний и переопределяет стандартный `_baseURI` из OpenZeppelin ERC721.
    /// @return Текущий базовый URI для метаданных токенов.
    function _baseURI() internal view override returns (string memory) {
        return _uri;
    }
    /// @notice Безопасно минтит новый уникальный токен с данным `tokenId` и переводит его на адрес получателя.
    /// @dev Функция применяет `_safeMint` метод для безопасного минтинга нового токена, может быть вызвана только владельцем.
    /// @param to Адрес получателя, на который будет переведен новый токен.
    /// @param tokenId Уникальный идентификатор токена, который будет создан и привязан к адресу получателя.
    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
