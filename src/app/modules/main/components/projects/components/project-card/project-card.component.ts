import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Project} from '../../../../../../models/entity.model';
import {ParametersPanelModel} from '../../../../../../components/parameters-panel/parameters-panel.model';
import * as dayjs from 'dayjs';
import {ProjectsService} from '../../../../../../state/projects/projects.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectEditComponent} from '../project-edit/project-edit.component';

@Component({
    selector: 'tsm-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.less']
})
export class ProjectCardComponent implements OnChanges, OnInit {

    @Input()
    project: Project;

    _parameters: ParametersPanelModel[];
    _header: string;


    constructor(private projectsService: ProjectsService,
                private matDialog: MatDialog) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.project) {
            this._parameters = [
                {
                    label: 'Active Sprint',
                    value: this.project.sprint ? `${this.project.sprintCode}-${this.project.sprint}` : '-'
                },
                {
                    label: 'Team',
                    value: `${this.project.userCount} Users Assigned`
                },
                {
                    label: 'Start Date',
                    value: this.project.startDate ? dayjs(this.project.startDate).format('MMM DD, YYYY') : '-'
                },
                {
                    label: 'Due Date',
                    value: this.project.dueDate ? dayjs(this.project.dueDate).format('MMM DD, YYYY') : '-'
                },
                {
                    label: 'Project Backlog',
                    value: `${this.project.backlogCount ?? 0} Tasks/${this.project.storyPoints ?? 0} Story Points`
                },
                {
                    label: 'Overdue Tasks',
                    value: `${this.project.overdues || 0}`
                }
            ];

            this._header = `${this.project.name} (${this.project.code})`;
        }
    }

    ngOnInit(): void {
    }

    _deleteProject(): void {
        this.projectsService.delete(this.project.id);
    }

    _editProject(): void {
        const submit = (project: Project): void => {
            this.projectsService.update(project);
        }
        this.matDialog.open(ProjectEditComponent, {
            data: {
                onSubmit: submit,
                project: this.project
            }
        });
    }
}
