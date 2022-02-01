import type { NextPage } from "next";
import { useState } from "react";
import { Table, BaseCell, ColumnDef, RowDef } from "../../components/table";
import { PoolCompositionCell } from "../../components/table/cells";
import {
  Switch,
  CheckBox,
  Radio,
  Toggle,
  MenuToggle,
  Slider,
  PageList,
  SortMenu,
} from "../../components/control";
import { InputBox, SearchBox } from "../../components/input";
import { Button, IconButton } from "../../components/buttons";

const Assets: NextPage = function () {
  const [isChecked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const [r, setR] = useState<"sm" | "md" | "lg">("sm");
  const [s, setS] = useState(50);
  const [p, setP] = useState(50);

  const [iV, setIV] = useState("");

  const tableCols: ColumnDef<BaseCell & PoolCompositionCell>[] = [
    {},
    {
      header: "Pool Name",
      displayCell: PoolCompositionCell,
    },
    {
      header: "Liquidity",
      infoTooltip: "This is liquidity",
    },
    {
      header: "APR (Annualized)",
    },
    {
      header: "My Liquidity",
    },
  ];

  const baseRow: RowDef = {
    makeHoverClass: () => "text-secondary-200",
  };

  const tableRows: RowDef[] = [
    { ...baseRow, onClick: (i) => console.log(i) },
    { ...baseRow, onClick: (i) => console.log(i) },
    { ...baseRow, onClick: (i) => console.log(i) },
    { ...baseRow, onClick: (i) => console.log(i) },
    { ...baseRow, onClick: (i) => console.log(i) },
    { ...baseRow, onClick: (i) => console.log(i) },
  ];

  const tableData: Partial<BaseCell & PoolCompositionCell>[][] = [
    [
      { value: "A" },
      { value: "A", poolId: 1, tokenDenoms: ["ATOM", "OSMO"] },
      { value: "asf" },
      { value: "fff" },
      { value: "fjd" },
    ],
    [
      { value: "A" },
      { value: "A", poolId: 2, tokenDenoms: ["ATOM", "OSMO"] },
      { value: "asf" },
      { value: "fff" },
      { value: "fjd" },
    ],
    [
      { value: "A" },
      { value: "A", poolId: 3, tokenDenoms: ["ATOM", "OSMO"] },
      { value: "asf" },
      { value: "fff" },
      { value: "fjd" },
    ],
    [
      { value: "A" },
      { value: "A", poolId: 4, tokenDenoms: ["ATOM", "OSMO"] },
      { value: "asf" },
      { value: "fff" },
      { value: "fjd" },
    ],
    [
      { value: "A" },
      { value: "A", poolId: 5, tokenDenoms: ["ATOM", "OSMO"] },
      { value: "asf" },
      { value: "fff" },
      { value: "fjd" },
    ],
    [
      { value: "A" },
      { value: "A", poolId: 6, tokenDenoms: ["ATOM", "OSMO"] },
      { value: "asf" },
      { value: "fff" },
      { value: "fjd" },
    ],
  ];

  return (
    <main className="max-w-container mx-auto">
      <div className="bg-background py-20 flex justify-center items-center">
        <Switch isOn={isChecked} onChange={setChecked} disabled={disabled} />
        Disable:
        <Switch isOn={disabled} onChange={setDisabled} />
        <Button
          size={r}
          onClick={() => console.log("click")}
          disabled={disabled}
        >
          <div>Hello</div>
        </Button>
        <IconButton onClick={() => console.log("click")} />
        <CheckBox onChange={setChecked} isOn={isChecked} disabled={disabled} />
        <CheckBox onChange={setChecked} isOn={isChecked} disabled={disabled} />
        <CheckBox onChange={setChecked} isOn={isChecked} disabled={disabled} />
        Sm
        <Radio
          value="sm"
          onChange={(v) => setR(assign(v) ?? "sm")}
          groupValue={r}
          disabled={disabled}
        />
        Md
        <Radio
          value="md"
          onChange={(v) => setR(assign(v) ?? "sm")}
          groupValue={r}
          disabled={disabled}
        />
        Lg
        <Radio
          value="lg"
          onChange={(v) => setR(assign(v) ?? "sm")}
          groupValue={r}
          disabled={disabled}
        />
        <Toggle onChange={setChecked} isOn={isChecked} disabled={disabled}>
          test
        </Toggle>
      </div>
      <div className="bg-background py-20 flex justify-center items-center">
        <MenuToggle
          options={[
            { id: "sm", display: "small" },
            { id: "md", display: "medium" },
          ]}
          selectedOptionId={r}
          onSelect={(v) => setR(assign(v) ?? "sm")}
        />
      </div>
      <div className="flex bg-background py-20 justify-center items-center w-full">
        <Slider
          type="entrybox"
          currentValue={s}
          onChange={(v) => setS(v)}
          min={0}
          max={100}
        />
      </div>
      <div className="bg-background py-8 justify-center items-center">
        <Table<BaseCell & PoolCompositionCell>
          columnDefs={tableCols}
          rowDefs={tableRows}
          data={tableData}
        />
      </div>
      <div className="bg-background py-8 justify-center items-center">
        <span className="m-10">{s}</span>
        <PageList
          currentValue={p}
          onChange={(v) => setP(v)}
          min={0}
          max={100}
          editField
        />
      </div>
      <div className="bg-background py-8 justify-center items-center">
        <SortMenu
          options={[
            { id: "a", display: "Apple" },
            { id: "b", display: "Babelasdfasdfasdfasdf" },
            { id: "c", display: "Bear" },
          ]}
          selectedOptionId={iV}
          onSelect={setIV}
          disabled={disabled}
        />
      </div>
      <div className="bg-surface py-8 justify-center items-center">
        <InputBox
          currentValue={iV}
          placeholder={"50"}
          onChange={setIV}
          labelButtons={[
            { label: "MAX", onClick: () => setIV("MAX!") },
            // { label: "HALF", onClick: () => console.log("label button 2") },
          ]}
          disabled={disabled}
          clearButton
        />
      </div>
      <div className="bg-background py-8 justify-center items-center">
        <SearchBox
          currentValue={iV}
          placeholder="Filter by symbol"
          onChange={setIV}
          disabled={disabled}
        />
      </div>
    </main>
  );
};

function assign(val: string) {
  if (val === "sm" || val === "md" || val === "lg") {
    return val;
  }
  return undefined;
}

export default Assets;
