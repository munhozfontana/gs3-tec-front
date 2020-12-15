import { Grid, IconButton, InputBase } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ResetIcon from '@material-ui/icons/Clear';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormValidators } from '../../validations/form-validators';


interface ChipData {
    key: string;
    label: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
        },
        chip: {
            margin: theme.spacing(0.5),
        },
    }),
);

export default function ChipsArray(props: any) {
    const classes = useStyles();
    const [chipData, setChipData] = useState<ChipData[]>([]);
    const [field, setField] = useState("");


    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <Grid
            container
            xs={11}
            justify="space-around"
            direction="column"
        >
            <Paper component="form" className={classes.root}>

                <InputBase
                    onChange={value => setField(value.target.value)}
                    placeholder="Search Google Maps"
                    value={field || ""}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton 
               
                onClick={() => {
                  if(!FormValidators.invalidField(field)) {
                    setChipData([...chipData, { label: field, key: uuidv4() }]);
                    setField("")
                  }
                }} aria-label="Adicionar">
                    <AddIcon />
                </IconButton>
                <IconButton onClick={() => setChipData([])} aria-label="Adicionar">
                    <ResetIcon />
                </IconButton>
            </Paper>


            { chipData.length ? <Paper component="ul" className={classes.root}>
                {chipData.map((data) => {

                    return (
                        <li key={data.key}>
                            <Chip
                                label={data.label}
                                onDelete={handleDelete(data)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
            </Paper> : <></>}
        </Grid>
    );
}