import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classes from './ReportListView.module.scss';
import { Report } from '../../models/Report';

interface ReportListViewProps extends RouteComponentProps {
    reports: Report[];
}

const ReportListView = (props: ReportListViewProps) => {
    const onEditHandler = (report: Report) => {
        props.history.push(`/reportlistview/${report.quarter.year}/${report.quarter.quarterNumber}`)
    }

    const onDeleteHandler = (report: Report) => {
        console.log('report deleting');
    }
    
    let content: JSX.Element;

    if (props.reports.length === 0) {
        content = <h2>Нет отчетов</h2>;
    } else {
        content = (
            <>
                {props.reports.map((report, index) => {
                    return (
                        <div key={index} className={classes['table-row']} >
                            <div className={classes.column}>{report.quarter.year}</div>
                            <div className={classes.column}>{report.quarter.quarterNumber}</div>
                            <div className={classes.column}>{report.totalsForSectionOne}</div>
                            <div className={classes.column}>{report.totalsForSectionTwo}</div>
                            <div className={classes.column}>{report.balans}</div>
                            <div className={classes['actions-column']}>
                                <span onClick={onEditHandler.bind(null, report)}>Редактировать</span>
                                <span onClick={onDeleteHandler.bind(null, report)}>Удалить</span>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    }

    return (
        <div className={classes['report-list']}>
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
        reports: state.reports.reports,
    };
};

export default connect(mapStateToProps)(ReportListView);
