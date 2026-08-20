import { skillGroups } from '@/lib/content'

export default function Skills() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {skillGroups.map((group) => (
        <div key={group.category} className="card p-5">
          <h3 className="subhead mb-3">{group.category}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <li key={skill} className="tag">{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
