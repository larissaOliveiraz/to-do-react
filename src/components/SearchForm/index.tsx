import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import styles from "./styles.module.scss";

type Props = {
   onSearch: (searchValue: string) => void;
};

export const SearchForm = ({ onSearch }: Props) => {
   const [focused, setFocused] = useState(false);
   const [search, setSearch] = useState("");

   return (
      <div
         className={styles.container}
         style={{ borderColor: focused ? "#0c0910" : "#e2e2e2" }}
      >
         <div>
            <MagnifyingGlass size={24} weight="bold" />
         </div>
         <input
            type="text"
            placeholder="Search your tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyUp={() => onSearch(search)}
         />
      </div>
   );
};
