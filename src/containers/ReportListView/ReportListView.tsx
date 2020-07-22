import React, { RefObject } from 'react';
import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classes from './ReportListView.module.scss';
import { Quarter } from '../../models/Quarter';
import { Report } from '../../models/Report';
import { deleteReport } from '../../redux/actions/reportActions';
import { Button } from '../../components/ui/Button/Button';
import { Select } from '../../components/ui/Select/Select';

interface ReportListViewProps extends RouteComponentProps {
    deleteReport: (report: Report) => any;
    quarters: Quarter[];
    reports: Report[];
}

const ReportListView = (props: ReportListViewProps) => {
    const createButtonSelectRef = React.createRef<HTMLSelectElement>();

    const onCreateHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (createButtonSelectRef.current?.value) {
            const arr = createButtonSelectRef.current.value.split(':');
            const year = arr[0];
            const quarterNumber = arr[1];

            props.history.push(`/reportdetailview/${year}/${quarterNumber}`);
        }
    };

    const onEditHandler = (report: Report) => {
        props.history.push(`/reportdetailview/${report.quarter.year}/${report.quarter.quarterNumber}`);
    };

    const onDeleteHandler = (report: Report) => {
        props.deleteReport(report);
    };

    let content: JSX.Element;

    if (props.reports.length === 0) {
        content = <h2>Нет отчетов</h2>;
    } else {
        content = (
            <>
                {props.reports.map((report, index) => {
                    return (
                        <div key={index} className={classes['table-row']}>
                            <div className={classes.column}>{report.quarter.year}</div>
                            <div className={classes.column}>{report.quarter.quarterNumber}</div>
                            <div className={classes.column}>{report.totalsForSectionOne}</div>
                            <div className={classes.column}>{report.totalsForSectionTwo}</div>
                            <div className={classes.column}>{report.balans}</div>
                            <div className={classes['actions-column']}>
                                <span onClick={onEditHandler.bind(null, report)}>
                                    <FaEdit />
                                </span>
                                <span onClick={onDeleteHandler.bind(null, report)}>
                                    <FaRegWindowClose />
                                </span>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    }

    const createButtonSelectOptions = props.quarters.filter(q => !props.reports.some((r) => r.quarter.year === q.year && r.quarter.quarterNumber === q.quarterNumber))

    return (
        <div className={classes['report-list']}>
            <Select disabled={createButtonSelectOptions.length === 0} reference={createButtonSelectRef}>
                {createButtonSelectOptions.map((quarter, index) => {
                    if (props.reports.some((r) => r.quarter.year === quarter.year && r.quarter.quarterNumber === quarter.quarterNumber)) {
                        return null;
                    }

                    return (
                        <option
                            key={index}
                            value={`${quarter.year}:${quarter.quarterNumber}`}
                        >{`${quarter.year} - ${quarter.quarterNumber}`}</option>
                    );
                })}
            </Select>
            <Button disabled={createButtonSelectOptions.length === 0} onClick={onCreateHandler}>
                Создать
            </Button>
            <div className={classes['table-header']}>
                <div className={classes.column}>Год</div>
                <div className={classes.column}>Номер квартала</div>
                <div className={classes.column}>Итоги по разделу I</div>
                <div className={classes.column}>Итоги по разделу II</div>
                <div className={classes.column}>БАЛАНС</div>
                <div className={classes['actions-column']}>Действия</div>
            </div>
            {content}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        quarters: state.quarters.quarters,
        reports: state.reports.reports,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteReport: (report: Report) => dispatch(deleteReport(report)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportListView);
