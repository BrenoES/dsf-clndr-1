import { Box, Chip, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: '2px 5px',
        },
        chip: {
            margin: theme.spacing(0.5),
        },
    }),
);

export default function SuggestionsTags({ listSuggestions }) {
    const classes = useStyles()
    return (
        <>{
            listSuggestions.map((suggestions, index) => (
                <Chip key={index} className={classes.root} label={suggestions.term} variant="outlined" />
            ))}
        </>
    )
}