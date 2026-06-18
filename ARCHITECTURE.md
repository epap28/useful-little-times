# Architecture Notes

Useful Little Times is a Next.js App Router application with server-rendered pages and server actions.

## Main Flow

1. A user signs up or signs in.
2. The user chooses preferred and avoided categories.
3. The dashboard button creates a `UserItemInteraction`.
4. The recommendation service chooses either a learning item or movement card.
5. Feedback updates the interaction row.
6. After ten uses, or when the user ends the session, a `Recap` snapshot is saved.

## Data Model

Core tables:

- `User`
- `Category`
- `UserPreference`
- `LearningItem`
- `Source`
- `LearningItemSource`
- `ActivityItem`
- `UserItemInteraction`
- `Recap`

Learning item sources are mandatory in seed validation and modeled as a many-to-many relation.

## Auth

V1 uses local credentials and signed HTTP-only cookies. Passwords are hashed with Node's `scrypt`. This keeps the open-source setup low-friction while leaving room for OAuth/Auth.js later.

## Recommendation

The algorithm is deterministic scoring plus controlled randomness. It avoids blocked categories, favors preferred categories, interleaves topics, schedules lightweight review, and inserts activity cards after several uses.
