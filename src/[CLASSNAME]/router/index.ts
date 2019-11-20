import { router as GetRouter } from './get';
import { router as PostRouter } from './post';
import { router as PutRouter } from './put';
import { router as DelRouter } from './del';

export const modelRouters = [GetRouter, PostRouter, PutRouter, DelRouter];
