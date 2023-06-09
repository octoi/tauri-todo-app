import { PropsWithChildren } from 'react';

export type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;
