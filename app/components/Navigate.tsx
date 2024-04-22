interface ItemBase {
  id: number;
}

interface Props<Item> {
  items: Item[];
  active: Item;
  onNavigate: (item: Item) => void;
}

export default function Navigate<Item extends ItemBase>(props: Props<Item>) {
  const itemClass = (id: number) => {
    return props.active.id === id
      ? "bg-[#228DF8]"
      : "bg-[rgba(222_148_255_/_20%)]";
  };
  const handleItemClick = (item: Item) => {
    props.onNavigate(item);
  };
  return (
    <ul className="flex items-center gap-[12px] mt-[61px]">
      {props.items.map((item) => {
        return (
          <li
            key={item.id}
            className={`h-[17px] w-[17px] rounded-[5px] cursor-pointer ${itemClass(
              item.id
            )}`}
            onClick={() => handleItemClick(item)}
            role="presentation"
          ></li>
        );
      })}
    </ul>
  );
}
