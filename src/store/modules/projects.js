/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { v4 } from 'uuid';
import defaultProject from '@/composer/default.json';
import * as types from '../mutation-types';

const state = {
  projects: [],
};

const getters = {
  allProjects: (state) => state.projects,
  projectById: (state) => (id) => state.projects.find((r) => String(r.id) === String(id)),
};

const actions = {
  async createProject({ commit }) {
    const newProject = {
      id: v4(),
      editor: defaultProject,
      name: `New Project ${ new Date().toLocaleTimeString()}`,
    };

    commit(types.PROJECTS_ADD_PROJECT, newProject);
    return newProject;
  },
  async updateProject({ commit }, project) {
    commit(types.PROJECTS_UPDATE_PROJECT, project);
    return project;
  },
  async deleteProject({ commit }, project) {
    commit(types.PROJECTS_DELETE_PROJECT, project);
    return project;
  },
};

const mutations = {
  [types.PROJECTS_ADD_PROJECT](state, project) {
    state.projects.push(project);
  },
  [types.PROJECTS_UPDATE_PROJECT](state, project) {
    let updated = false;
    state.projects = state.projects.map((item) => {
      if (project.id === item.id) {
        updated = true;
        return project;
      }
      return item;
    });

    if (!updated) state.projects.push(project);
  },
  [types.PROJECTS_DELETE_PROJECT](state, project) {
    state.projects = state.projects.filter((item) => item.id !== project.id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
