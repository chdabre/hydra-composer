import Rete from 'rete';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import AreaPlugin from 'rete-area-plugin';
import MinimapPlugin from 'rete-minimap-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';

import OscComponent from '@/composer/components/sources/OscComponent';
import RotateComponent from '@/composer/components/geometry/RotateComponent';
import BlendComponent from '@/composer/components/operators/BlendComponent';
import VariableComponent from '@/composer/components/math/VariableComponent';
import NumberComponent from '@/composer/components/math/NumberComponent';
import OutputComponent from '@/composer/components/OutputComponent';
import GradientComponent from '@/composer/components/sources/GradientComponent';
import NoiseComponent from '@/composer/components/sources/NoiseComponent';

export default async (container, modelBuilder) => {
  const components = [
    new OscComponent(),
    new RotateComponent(),
    new BlendComponent(),
    new VariableComponent(),
    new NumberComponent(),
    new GradientComponent(),
    new NoiseComponent(),
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
