import React from 'react';
import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classes from './QuarterListView.module.scss';
import { Button } from '../../components/ui/Button/Button';
import { Quarter } from '../../models/Quarter';
import { deleteQuarter } from '../../redux/actions/quarterActions';

interface QuarterListProps extends RouteComponentProps {
    quarters: Quarter[];
    removeQuarter: (quarter: Quarter) => any;
}

const QuarterListView = (props: QuarterListProps) => {
    const onCreateHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        props.history.push('/quarterdetailview');
    }
    
    const onEditHandler = (quarter: Quarter) => {
        props.history.push(`/quarterdetailview/${quarter.year}/${quarter.quarterNumber}`);
    };

    const onDeleteHandler = (quarter: Quarter) => {
        props.removeQuarter(quarter);
    };

    return (
        <div className={classes['quarter-list']}>
            <Button onClick={onCreateHandler}>Создать</Button>
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
                            <span onClick={onEditHandler.bind(null, quarter)}>
                                <FaEdit />
                            </span>
                            <span onClick={onDeleteHandler.bind(null, quarter)}>
                                <FaRegWindowClose />
                            </span>
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
