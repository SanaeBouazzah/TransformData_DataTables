<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/users')]
// #[IsGranted('ROLE_USER')]
final class UserController extends AbstractController
{
    #[Route('/', name: 'app_user_index', methods: ['GET'], options: ['expose' => true])]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $users = $entityManager->getRepository(User::class)->findBY(['dateDeletion' => null]);
        return $this->render('gestion_users/user/index.html.twig', ['users' => $users]);
    }

    #[Route('/app_user_list', name: 'app_user_list', methods: ['GET'], options: ['expose' => true])]
    public function fetchAlertes(Request $request , EntityManagerInterface $entityManager){
        $draw = $request->query->get('draw');
        $start = $request->query->get('start') ?? 0;
        $length = $request->query->get('length') ?? 10;
        $search = $request->query->all('search')["value"];
        $queryBuilder = $entityManager->createQueryBuilder()
            ->select('u')
            ->from(User::class, 'u')
            ->where('u.dateDeletion IS NULL');
        if (!empty($search)) {
            $queryBuilder->andWhere('u.nom LIKE :search OR u.prenom LIKE :search OR u.username LIKE :search OR u.id LIKE :search')
                ->setParameter('search', "%$search%");
        }
        $queryBuilder->setFirstResult($start)
            ->setMaxResults($length);
        $results = $queryBuilder->getQuery()->getResult();
        $totalRecords = $entityManager->createQueryBuilder()
            ->select('COUNT(u.id)')
            ->from(User::class, 'u')
            ->where('u.dateDeletion IS NULL')
            ->getQuery()
            ->getSingleScalarResult();
        
        $formattedData = [];
        foreach ($results as $user) {
             $formattedData[] = [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'username' => $user->getUsername(),
                'roles' => $user->getRoles(),
                'position' => $user->getPosition(),
                'adresse' => $user->getAdresse(),
                'Tel1' => $user->getTel1(),
                'Tel2' => $user->getTel2(),
                'dateCreation' => $user->getDateCreation()?->format('Y-m-d H:i:s'),
             ];
        }
        return new JsonResponse([
            'draw' => $draw,
            'recordsTotal' => $totalRecords,
            'recordsFiltered' =>$totalRecords,
            'data' => $formattedData,
        ]);
    }

    #[Route('/new', name: 'app_user_new', options: ['expose'=>true], methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface  $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = json_decode($request->getContent(), true);
        if( !empty($data['nom']) || !empty($data['prenom']) || !empty($data['username']) ||
        !empty($data['password']) || !empty($data['position']) || !empty($data['adresse']) ||
         !empty($data['Tel1']) || !empty($data['Tel2'])){
            $user = new User();
            $user->setNom($data['nom']);
            $user->setPrenom($data['prenom']);
            $user->setUsername($data['username']);
            $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);
            $user->setPosition($data['position']);
            $user->setAdresse($data['adresse']);
            $user->setTel1($data['Tel1']);
            $user->setTel2($data['Tel2']); 
            $user->setRoles($data['roles'] ?? ['ROLE_USER']);
            $entityManager->persist($user);
            $entityManager->flush();
            return new JsonResponse([
                'success' => true,
                'message' => 'User created successfully'
            ]);
        }
        return new JsonResponse([
            'success' => false,
            'message' => 'Missing required user data'
        ], Response::HTTP_BAD_REQUEST);

    }
    
    #[Route('/{id}', name: 'app_user_show', methods: ['GET'], requirements: ['id' => '\d+'], options: ['expose' => true])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        return new JsonResponse([
            'user' => [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'username' => $user->getUsername(),
                'position' => $user->getPosition(),
                'adresse' => $user->getAdresse(),
                'Tel1' => $user->getTel1(),
                'Tel2' => $user->getTel2(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }

    #[Route('/get/{id}/edit', name: 'app_user_get', methods: ['GET'],  options: ['expose'=>true])]
    public function getUserById(Request $request, int $id, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        if (!$user) {
            return new JsonResponse(['error' => 'user not found'], 404);
        }
        $data=[
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
            'position' => $user->getPosition(),
            'adresse' => $user->getAdresse(),
            'Tel1' => $user->getTel1(),
            'Tel2' => $user->getTel2(),
            'roles' => $user->getRoles(),
        ];
        return new JsonResponse(['data' => $data]);
    }

    #[Route('/{id}/edit', name: 'app_user_edit', methods: ['POST'],  options: ['expose'=>true])]
    public function edit(Request $request, int $id, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        $data = json_decode($request->getContent(), true);
        if( !empty($data['nom']) || !empty($data['prenom']) || !empty($data['username']) ||
        !empty($data['password']) || !empty($data['position']) || !empty($data['adresse']) ||
         !empty($data['Tel1']) || !empty($data['Tel2'])){
            $user->setNom($data['nom']);
            $user->setPrenom($data['prenom']);
            $user->setUsername($data['username']);
            $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);
            $user->setPosition($data['position']);
            $user->setAdresse($data['adresse']);
            $user->setTel1($data['Tel1']);
            $user->setTel2($data['Tel2']); 
            $roles = $data['roles'] ?? [];
            $user->setRoles($roles);
            $entityManager->flush();
            $users = $entityManager->getRepository(User::class)->findAll();
            $html = $this->renderView('gestion_users/partials/list.html.twig', ['users' => $users]);
            return new JsonResponse(['html' => $html]);
        }
        return $this->render('gestion_users/user/new.html.twig');
    }

    #[Route('/{id}/delete', name: 'app_user_delete', methods: ['POST'],  options: ['expose'=>true])]
    public function delete(User $user, EntityManagerInterface $entityManager): JsonResponse
    {
        //not to delete but just to set date of column deletion.
        $user->setDateDeletion(new \DateTimeImmutable);
        $entityManager->flush();
        return new JsonResponse(['success' => true]);
    }
}
