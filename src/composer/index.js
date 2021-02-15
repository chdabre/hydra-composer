import Rete from 'rete';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import AreaPlugin from 'rete-area-plugin';
import MinimapPlugin from 'rete-minimap-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';

import OscComponent from './components/OscComponent';
import RotateComponent from './components/RotateComponent';
import BlendComponent from './components/BlendComponent';
import VariableComponent from './components/VariableComponent';
import NumberComponent from './components/NumberComponent';
import OutputComponent from './components/OutputComponent';

export default async (container, modelBuilder) => {
  const components = [
    new OscComponent(),
    new RotateComponent(),
    new BlendComponent(),
    new VariableComponent(),
    new NumberComponent(),
    new OutputComponent(modelBuilder),
  ];

  const editor = new Rete.NodeEditor('demo@0.1.0', container);

  editor.use(VueRenderPlugin);
  editor.use(ConnectionPlugin);
  editor.use(AreaPlugin, {
    scaleExtent: { min: 0.1, max: 1 },
  });
  editor.use(MinimapPlugin);
  editor.use(ContextMenuPlugin, {
    delay: 500,
    allocate: (c) => (c.path ? c.path.split('/') : []),
  });

  const engine = new Rete.Engine('demo@0.1.0');

  components.forEach((component) => {
    editor.register(component);
    engine.register(component);
  });

  editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
    await engine.abort();
    await engine.process(editor.toJSON());

    localStorage.setItem('hydra', JSON.stringify(editor.toJSON()));
  });

  engine.on('error', ({ message, data }) => {
    console.log(message, data);
  });

  const savedState = JSON.parse(localStorage.getItem('hydra'));
  if (savedState) {
    await editor.fromJSON(savedState);
  }

  AreaPlugin.zoomAt(editor);

  setTimeout(() => editor.trigger('process'), 1000);

  return editor;
};
