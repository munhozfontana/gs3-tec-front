import {
    Grid,
    IconButton,
    InputBase,
    MenuItem,
    Select
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ResetIcon from "@material-ui/icons/Clear";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormValidators } from "../../validations/form-validators";

interface ChipData {
  key: string;
  text: string;
}
interface MaskFormatSelect {
  text: string;
  mask?(value: string): string;
}
interface ChipDataProps {
  add(list: ChipData[]): void;
  label: string;
  listSelect?: MaskFormatSelect[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

export default function ChipsArray({ add, label, listSelect }: ChipDataProps) {
  const classes = useStyles();
  const [chipData, setChipData] = useState<ChipData[]>([]);
  const [selected, setSelected] = React.useState("");
  const [field, setField] = useState("");

  useEffect(() => {
    add(chipData);
  }, [chipData]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleChangeSelect = (value: any) => {
    setSelected(value as string);
    setField("");
  };

  const updateMask = (value: string): React.SetStateAction<string> => {
    const resultItem = listSelect?.find((item) => item.text === selected);
    if (resultItem !== undefined && resultItem.mask) {
      return resultItem.mask(value);
    }
    return value;
  };

  return (
    <Grid container xs={11} justify="space-around" direction="column">
      <Paper component="form" className={classes.root}>
        <InputBase
          onChange={(value) => setField(updateMask(value.target.value))}
          placeholder={label}
          value={field || ""}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          onClick={() => {
            if (!FormValidators.invalidField(field)) {
              setChipData([...chipData, { text: field, key: uuidv4() }]);
              add(chipData);
              setField("");
            }
          }}
          aria-label="Adicionar"
        >
          <AddIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setChipData([]);
          }}
          aria-label="Adicionar"
        >
          <ResetIcon />
        </IconButton>

        {!!listSelect && (
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            value={selected}
            onChange={(event) => handleChangeSelect(event?.target?.value)}
            renderValue={(value) => `${value}`}
          >
            {listSelect?.map((value, i) => {
              return (
                <MenuItem key={i} value={value.text}>
                  {value.text}
                </MenuItem>
              );
            })}
          </Select>
        )}
      </Paper>

      {chipData.length ? (
        <Paper component="ul" className={classes.root}>
          {chipData.map((data) => {
            return (
              <li key={data.key}>
                <Chip
                  label={data.text}
                  onDelete={handleDelete(data)}
                  className={classes.chip}
                />
              </li>
            );
          })}
        </Paper>
      ) : (
        <></>
      )}
    </Grid>
  );
}
