import type { MarkdownInstance } from 'astro';
import { format } from 'date-fns';

import type { IProjectFrontmatter } from '@/types/IProjectFrontmatter';
import { transformTitleForContentCard } from '@/utils/StringWidth';
import type { Tags } from '@/utils/Tag';

import { Tag } from './Tag';

type IPostCardProps = {
  instance: MarkdownInstance<IProjectFrontmatter>;
  tags: Tags;
};

export const PostCard = (props: IPostCardProps) => (
  <div className="relative overflow-hidden rounded-md bg-slate-800">
    <div className="aspect-w-3 aspect-h-2">
      {props.instance.frontmatter.imgSrc && (
        <img
          className="h-full w-full object-cover object-center"
          src={props.instance.frontmatter.imgSrc}
          alt={props.instance.frontmatter.imgSrc}
          loading="lazy"
        />
      )}
    </div>

    <div className="absolute inset-0 flex flex-col justify-center">
      <div className="bg-gradient-to-br from-violet-900 backdrop-blur-lg">
        <div className="py-1.5 px-3">
          <a href={props.instance.url}>
            <div>
              {transformTitleForContentCard(props.instance.frontmatter.title)
                .split('\\n')
                .map((t) => (
                  <span key={t} className="text-lg font-bold">
                    {t}
                    <br />
                  </span>
                ))}
              <span className="align-middle text-xs text-gray-300	">
                {format(
                  new Date(props.instance.frontmatter.pubDate),
                  'LLL d, yyyy'
                )}
              </span>
            </div>
          </a>
          <div className="mt-1 flex flex-wrap gap-2">
            {props.instance.frontmatter.tags &&
              props.instance.frontmatter.tags.map((tagName) => (
                <Tag
                  key={tagName}
                  name={tagName}
                  color={props.tags[tagName]}
                  contentCategory={'Posts'}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
