import React from 'react';
import { connect } from 'react-redux';
import classes from './QuarterListView.module.scss';
import { Quarter } from '../../models/Quarter';
import { deleteQuarter } from '../../redux/actions/quarterActions';

interface QuarterListProps {
    quarters: Quarter[];
    removeQuarter: (quarter: Quarter) => any;
}

const QuarterListView = (props: QuarterListProps) => {
    const onDeleteHandler = (quarter: Quarter) => {
        props.removeQuarter(quarter);
    };

    return (
        <div className={classes['quarter-list']}>
            <div className={classes['table-header']}>
                <div className={classes.column}>Год</div>
                <div className={classes.column}>Номер квартала</div>
                <div className={classes['actions-column']}>Действия</div>
            </div>
            {props.quarters.map((quarter, index) => {
                return (
                    <div className={classes['table-row']} key={index}>
                        <div className={classes.column}>{quarter.year}</div>
                        <div className={classes.column}>{quarter.quarterNumber}</div>
                        <div className={classes['actions-column']}>
                            <span onClick={onDeleteHandler.bind(null, quarter)}>Удалить</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        quarters: state.quarters.quarters,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeQuarter: (quarter: Quarter) => dispatch(deleteQuarter(quarter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarterListView);
