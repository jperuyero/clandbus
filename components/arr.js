export const arr = (item) => {
  const arr = {
    OrderType: {
      value: item.OrderType,
    },
    Customer: {
      value: item.CustomerID,
    },
    ExternalReference: {
      value: item.Referencia,
    },
    CustomerOrderNbr: {
      value: Math.random() * 10000000000000000,
    },
    Location: {
      value: item.Ubicación,
    },
    OrderDetail: [
      {
        DiscountPercent: {
          value: item['Discount Percent'],
        },
        InventoryID: {
          value: item.InventoryID,
        },
        UnitPrice: {
          value: item['Unit Price'],
        },
        UOM: {
          value: item.UOM,
        },
        Warehouse: {
          value: item.Warehouse,
        },
        Quantity: {
          value: item.Qty /* If Allocation section is not sent*/,
        },
      },
    ],
  }
  return arr
}
