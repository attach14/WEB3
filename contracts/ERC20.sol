// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken20 is ERC20, ERC20Permit, Ownable {
    uint256 constant comission = 10;
    /// @notice Конструктор контракта, который минтит начальное количество токенов и указывает владельца.
    /// @param initialOwner Адрес владельца, которому принадлежат права собственности на контракт.
    constructor(address initialOwner) ERC20("MyToken", "MTK") ERC20Permit("MyToken") Ownable(initialOwner) {
        _mint(msg.sender, 2024 * 10 ** decimals());
    }
    /// @notice Рассчитывает комиссию для заданной суммы.
    /// @dev Функция вычисляет n% от суммы.
    /// @param value Значение, для которого вычисляется комиссия.
    /// @return Итоговая комиссия.
    function getCommission(uint256 value) public pure returns(uint256) {
        return (value * comission) / 100;
    }
    /// @notice Покупка токенов за эфир.
    /// @dev Функция переводит токены владельца контракта пользователю за эфир, проверяя крайние случаи
    /// @notice Пользователь отправляет эфир, после чего токены поступают на его счёт.
    ///         Токены отправляются от владельца контракта.
    function buy() public payable {
        require(msg.value > 0, "You need to send ether");
        require(balanceOf(owner()) >= msg.value, "Too big ether count");
        _transfer(owner(), msg.sender, msg.value);
    }
    /// @notice Перевод токенов от отправителя к получателю.
    /// @dev Переопределяет стандартную функцию `transfer` для учета комиссии.
    /// @param getter Адрес получателя токенов.
    /// @param value Количество токенов для перевода.
    /// @return `true`, если перевод успешен.
    function transfer(address getter, uint256 value) public override returns(bool) {
        return transferFrom(msg.sender, getter, value);
    }
    /// @notice Перевод токенов от одного адреса к другому.
    /// @dev Использует `allowance` и снимает комиссию (она сжигается)
    /// @param sender Адрес отправителя, с которого будет произведен перевод.
    /// @param getter Адрес получателя токенов.
    /// @param value Количество токенов, которое хочет передать отправитель.
    /// @return `true`, если перевод успешен.
    function transferFrom(address sender, address getter, uint256 value) public override returns(bool) {
        _spendAllowance(sender, _msgSender(), value);
        _transfer(sender, getter, value - getCommission(value));
        _burn(sender, getCommission(value));
        return true;
    }
}
