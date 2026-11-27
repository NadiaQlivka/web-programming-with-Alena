import { useState } from "react";

import { useCartStore } from "../../store/cartStore";

import { CartItem } from "../../components/CartItem/CartItem";
import { EmptyCart } from "../../components/EmptyCart/EmptyCart";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";

import styles from "./CartPage.module.scss";

type CartTab = "cart" | "history";

function getProductWord(quantity: number): string {
  const lastDigit = quantity % 10;
  const lastTwoDigits = quantity % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "товаров";
  }

  if (lastDigit === 1) {
    return "товар";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "товара";
  }

  return "товаров";
}

export function CartPage() {
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeProducts = useCartStore(
    (state) => state.removeProducts
  );

  const [activeTab, setActiveTab] =
    useState<CartTab>("cart");

  const [selectedIds, setSelectedIds] =
    useState<number[]>([]);

  const [deleteIds, setDeleteIds] =
    useState<number[]>([]);

  const selectedItems = items.filter((item) =>
    selectedIds.includes(item.product.id)
  );

  const selectedQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const selectedTotal = selectedItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const allSelected =
    items.length > 0 &&
    selectedItems.length === items.length;

  function toggleProduct(id: number) {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        items.map((item) => item.product.id)
      );
    }
  }

  function confirmDelete() {
    removeProducts(deleteIds);

    setSelectedIds((previous) =>
      previous.filter((id) => !deleteIds.includes(id))
    );

    setDeleteIds([]);
  }

  const productToDelete = items.find(
    (item) => item.product.id === deleteIds[0]
  );

  return (
    <section className={styles.cartPage}>
      <div className={`container ${styles.container}`}>

        <nav
          className={styles.tabs}
          aria-label="Разделы корзины"
        >
          <button
            type="button"
            aria-pressed={activeTab === "cart"}
            className={`${styles.tab} ${
              activeTab === "cart" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("cart")}
          >
            Корзина
          </button>

          <button
            type="button"
            aria-pressed={activeTab === "history"}
            className={`${styles.tab} ${
              activeTab === "history" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            История заказов
          </button>
        </nav>

        {activeTab === "cart" ? (
          items.length === 0 ? (
            <EmptyCart />
          ) : (
            <section className={styles.cartContent}>

              <div className={styles.toolbar}>

                <Checkbox
                  label="Выбрать все"
                  checked={allSelected}
                  onChange={toggleAll}
                />

                {selectedItems.length > 0 && (
                  <button
                    type="button"
                    className={styles.deleteSelected}
                    onClick={() =>
                      setDeleteIds(
                        selectedItems.map(
                          (item) => item.product.id
                        )
                      )
                    }
                  >
                    <span aria-hidden="true">×</span>

                    {allSelected
                      ? "Удалить все"
                      : "Удалить выбранные"}
                  </button>
                )}

              </div>

              <div className={styles.items}>

                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    selected={selectedIds.includes(
                      item.product.id
                    )}
                    onSelect={toggleProduct}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={(id) => setDeleteIds([id])}
                  />
                ))}

              </div>

              <div className={styles.total}>
                {selectedQuantity}{" "}
                {getProductWord(selectedQuantity)} на{" "}
                {selectedTotal.toLocaleString("ru-RU")} ₽
              </div>

            </section>
          )
        ) : (
          <section className={styles.history}>
            <h2>История заказов</h2>

            <p>
              История заказов.
            </p>
          </section>
        )}

      </div>

      <Modal
        isOpen={deleteIds.length > 0}
        onClose={() => setDeleteIds([])}
        title="Вы действительно хотите удалить?"
        actions={
          <>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setDeleteIds([])}
            >
              Отмена
            </button>

            <Button onClick={confirmDelete}>
              Да, удалить
            </Button>
          </>
        }
      >
        <p>
          {deleteIds.length === 1
            ? productToDelete?.product.name
            : "Выбранные товары будут удалены из корзины."}
        </p>
      </Modal>

    </section>
  );
}