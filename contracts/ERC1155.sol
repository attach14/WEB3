// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken1155 is ERC1155, Ownable {
    /// @notice Конструктор контракта, который указывает владельца.
    /// @param initialOwner Адрес владельца, которому принадлежат права собственности на контракт.
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}

    /// @notice Устанавливает новый базовый URI для всех токенов.
    /// @dev Функция может быть вызвана только владельцем контракта.
    /// @param newuri Новый URI, который будет установлен в качестве базового URI для токенов.
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    /// @notice Выпускает новый токен определенного ID и передает его на указанный аккаунт.
    /// @dev Функцию может вызывать только владелец контракта.
    /// @param account Адрес получателя.
    /// @param id Уникальный идентификатор токена.
    /// @param amount Количество токенов для выпуска.
    /// @param data Дополнительные данные, которые будут переданы при создании токена.
    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }
}
